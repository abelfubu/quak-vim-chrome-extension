chrome.action.onClicked.addListener((tab) => {
  chrome.tabs
    .sendMessage(Number(tab.id), {
      action: 'showOverlay',
      extensionId: chrome.runtime.id,
    })
    .then(() => true)
})
