const createOverlay = (extensionId: string, action: 'tabs' | 'bookmarks' | 'history') => {
  // Create a container div for the overlay
  const overlay = document.createElement('div')
  overlay.id = 'angular-overlay'
  document.body.appendChild(overlay)

  overlay.innerHTML = `<iframe class="quak-vim-frame" src="chrome-extension://${extensionId}/index.html?action=${action}"></iframe>`
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'close') {
    document.getElementById('angular-overlay')?.remove()
  }
})

window.addEventListener('keyup', (event) => {
  if (
    ['INPUT', 'TEXTAREA'].includes(document.activeElement!.tagName) ||
    document.activeElement?.hasAttribute('contenteditable')
  ) {
    return
  }

  if (event.key === 'b') {
    createOverlay(chrome.runtime.id, 'bookmarks')
  }

  if (event.key === 'T') {
    createOverlay(chrome.runtime.id, 'tabs')
  }

  if (event.key === 'o') {
    createOverlay(chrome.runtime.id, 'history')
  }

  if (event.key === 'f') {
    highlightElements()
  }
})

window.addEventListener('click', () => {
  document.getElementById('angular-overlay')?.remove()
})

function highlightElements() {
  const searchableElements = [
    '[contentEditable=true]',
    '[tabindex]',
    'a[href]',
    'area[href]',
    'button:not([disabled])',
    'iframe',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
  ]

  const items = document.body.querySelectorAll(searchableElements.join(','))
  const elements = Array.from(
    Array.from(items)
      .reduce<Map<string, HTMLElement>>((visibleElements, element, index) => {
        if (isVisibleElement(element) && element instanceof HTMLElement) {
          return visibleElements.set(`${element.tagName}-${index}-${element.id}`, element)
        }

        return visibleElements
      }, new Map())
      .values(),
  )

  const keySource = 'SADFJKLEWCMPGH'
  const backdrop = document.createElement('div')
  backdrop.style.inset = '0'
  backdrop.style.position = 'absolute'
  backdrop.style.zIndex = '9998'

  const keys =
    elements.length > keySource.length
      ? generateTwoLetterCombinations(keySource, elements.length)
      : keySource.split('')

  const linksMap = new Map<string, { element: HTMLElement; badge: HTMLSpanElement }>()

  elements.forEach((element, index) => {
    const key = keys[index]
    const { top, right } = element.getBoundingClientRect()
    const badge = document.createElement('span')
    badge.id = 'quak-vim-link-match'
    badge.style.backgroundColor = '#1e1e2e'
    badge.style.color = '#cdd6f4'
    badge.style.padding = '2px 4px'
    badge.style.borderRadius = '4px'
    badge.style.position = 'absolute'
    badge.style.top = top + 'px'
    badge.style.left = right + 'px'
    badge.style.fontSize = '14px'
    badge.style.fontWeight = 'bold'
    badge.style.border = '1px solid #b4befe'
    badge.innerHTML = key
      .split('')
      .map((l) => `<span id="${l}">${l}</span>`)
      .join('')
    backdrop.appendChild(badge)
    linksMap.set(key, { element, badge })
  })

  document.body.appendChild(backdrop)

  let typed = ''

  document.addEventListener('keyup', setTyped)

  function setTyped(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      backdrop.remove()
      document.removeEventListener('keyup', setTyped)
      return
    }

    typed += event.key.toUpperCase()

    if (linksMap.has(typed)) {
      const { element } = linksMap.get(typed)!
      element.click()
      element.focus()
      backdrop.remove()
      document.removeEventListener('keyup', setTyped)
    }

    if (!keys.some((key) => key.startsWith(typed))) {
      backdrop.remove()
      document.removeEventListener('keyup', setTyped)
    }

    for (const [key, { badge }] of linksMap.entries()) {
      console.log({ key, typed })
      if (!key.startsWith(typed)) {
        badge.remove()
      } else {
        const letter = badge.querySelector<HTMLSpanElement>(`#${typed}`)!
        letter.style.color = '#fab387'
      }
    }
  }
}

function isVisibleElement(element: Element): boolean {
  const rect = element.getBoundingClientRect()
  return (
    rect.top < window.innerHeight &&
    rect.left < window.innerWidth &&
    rect.bottom > 0 &&
    rect.right > 0 &&
    element.getAttribute('tabindex') !== '-1'
  )
}

function generateTwoLetterCombinations(keySource: string, linksLength: number): string[] {
  const combinations: string[] = []

  for (const i of keySource) {
    for (const j of keySource) {
      combinations.push(i + j)
      if (combinations.length === linksLength) {
        return combinations
      }
    }
  }

  return combinations
}
