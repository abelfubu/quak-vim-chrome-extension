interface LinkReference {
  element: HTMLElement
  badge: HTMLSpanElement
}

export const LinkHighlighter = {
  highlightElements: [
    '[contentEditable=true]',
    '[tabindex]',
    'a[href]',
    'area[href]',
    'button:not([disabled])',
    'iframe',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
  ],
  keySource: 'SADFJKLEWCMPGH',
  getVisibleLinks() {
    const items = document.body.querySelectorAll(this.highlightElements.join(','))
    return Array.from(
      Array.from(items)
        .reduce<Map<string, HTMLElement>>((visibleElements, element, index) => {
          if (this.isVisibleElement(element) && element instanceof HTMLElement) {
            return visibleElements.set(
              `${element.tagName}-${index}-${element.id}`,
              element,
            )
          }

          return visibleElements
        }, new Map())
        .values(),
    )
  },
  generateTwoLetterCombinations(keySource: string, linksLength: number): string[] {
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
  },
  isVisibleElement(element: Element): boolean {
    const rect = element.getBoundingClientRect()
    return (
      rect.top < window.innerHeight &&
      rect.left < window.innerWidth &&
      rect.bottom > 0 &&
      rect.right > 0 &&
      element.getAttribute('tabindex') !== '-1'
    )
  },
  createBackdrop() {
    console.log(window.scrollY)
    const backdrop = document.createElement('div')
    backdrop.style.position = 'absolute'
    backdrop.style.top = window.scrollY + 'px'
    backdrop.style.height = '100vh'
    backdrop.style.width = '100vw'
    backdrop.style.zIndex = '9998'
    return backdrop
  },
  createBadge(element: HTMLElement, key: string) {
    const { top, left } = element.getBoundingClientRect()
    const badge = document.createElement('span')
    badge.id = 'quak-vim-link-match'
    badge.style.backgroundColor = 'var(--base)'
    badge.style.color = 'var(--text)'
    badge.style.padding = '2px 4px'
    badge.style.borderRadius = '4px'
    badge.style.position = 'absolute'
    badge.style.top = `${top}px`
    badge.style.left = `${left}px`
    badge.style.fontSize = '14px'
    badge.style.border = '1px solid var(--lavender)'
    badge.innerHTML = key
      .split('')
      .map((l) => `<span id="${l}">${l}</span>`)
      .join('')
    return badge
  },
  filterKeys(term: string, map: Map<string, LinkReference>) {
    for (const [key, { badge }] of map.entries()) {
      if (!key.startsWith(term)) {
        badge.remove()
      } else {
        const letter = badge.querySelector<HTMLSpanElement>(`#${term}`)!
        letter.style.color = 'var(--yellow)'
      }
    }
  },
  init() {
    const linksMap = new Map<string, LinkReference>()
    const backdrop = this.createBackdrop()
    const elements = this.getVisibleLinks()
    const keys =
      elements.length > this.keySource.length
        ? this.generateTwoLetterCombinations(this.keySource, elements.length)
        : this.keySource.split('')

    elements.forEach((element, index) => {
      const key = keys[index]
      const badge = this.createBadge(element, key)
      backdrop.appendChild(badge)
      linksMap.set(key, { element, badge })
    })

    document.body.appendChild(backdrop)

    let typed = ''

    document.addEventListener('keydown', setTyped)

    function setTyped(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        backdrop.remove()
        document.removeEventListener('keydown', setTyped)
        return
      }

      typed += event.key.toUpperCase()

      if (linksMap.has(typed)) {
        const { element } = linksMap.get(typed)!
        element.click()
        element.focus()
        backdrop.remove()
        document.removeEventListener('keydown', setTyped)
      }

      if (!keys.some((key) => key.startsWith(typed))) {
        backdrop.remove()
        document.removeEventListener('keydown', setTyped)
      }

      LinkHighlighter.filterKeys(typed, linksMap)
    }
  },
}
