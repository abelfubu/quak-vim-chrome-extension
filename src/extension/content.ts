import { LinkHighlighter } from './link-highlighter'
import { performScroll } from './scroller'

async function createOverlay(
  extensionId: string,
  action: 'tabs' | 'bookmarks' | 'history',
) {
  const overlay = document.createElement('div')
  overlay.id = 'angular-overlay'

  document.body.appendChild(overlay)

  overlay.innerHTML = `<iframe class="quak-vim-frame" src="chrome-extension://${extensionId}/index.html?action=${action}" sandbox="allow-scripts allow-same-origin allow-popups"></iframe>`
}

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'close') {
    document.getElementById('angular-overlay')?.remove()
  }
})

window.addEventListener('keydown', (event) => {
  if (
    event.ctrlKey ||
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
    LinkHighlighter.init()
  }

  if (event.key === 'H') {
    window.history.back()
  }

  if (event.key === 'g') {
    window.scrollTo(0, 0)
  }

  if (event.key === 'G') {
    window.scrollTo(0, document.body.scrollHeight)
  }

  if (event.key === 'k') {
    performScroll('y', -25)
  }

  if (event.key === 'j') {
    performScroll('y', 25)
  }
})

window.addEventListener('click', () => {
  document.getElementById('angular-overlay')?.remove()
})
