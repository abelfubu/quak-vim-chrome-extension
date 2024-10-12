export function favicon(url?: string): string {
  const chromeFavicon = new URL(chrome.runtime.getURL('/_favicon/'))
  chromeFavicon.searchParams.set('pageUrl', url || '')
  chromeFavicon.searchParams.set('size', '22')
  return chromeFavicon.toString()
}
