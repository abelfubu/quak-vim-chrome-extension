const specialScrollingElementMap = {
  'twitter.com': 'div.permalink-container div.permalink[role=main]',
  'reddit.com': '#overlayScrollContainer',
  'new.reddit.com': '#overlayScrollContainer',
  'www.reddit.com': '#overlayScrollContainer',
  'web.telegram.org': '.MessageList',
}

function getSpecialScrollingElement() {
  const selector =
    specialScrollingElementMap[
      window.location.host as keyof typeof specialScrollingElementMap
    ]
  if (selector) {
    return document.querySelector(selector)
  }

  return null
}

const getScrollingElement = () =>
  getSpecialScrollingElement() || document.scrollingElement || document.body

const scrollProperties = {
  x: {
    axisName: 'scrollLeft',
    max: 'scrollWidth',
    viewSize: 'clientWidth',
  },
  y: {
    axisName: 'scrollTop',
    max: 'scrollHeight',
    viewSize: 'clientHeight',
  },
}

export function performScroll(direction: any, amount: number) {
  const element = getScrollingElement() as any
  const axisName = scrollProperties[direction as 'x' | 'y'].axisName
  const before = element[axisName]
  if (element.scrollBy) {
    const scrollArg = { behavior: 'instant', left: 0, top: 0 }
    scrollArg[direction === 'x' ? 'left' : 'top'] = amount
    element.scrollBy(scrollArg)
  } else {
    element[axisName] += amount
  }
  return element[axisName] !== before
}
