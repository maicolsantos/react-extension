chrome.action.onClicked.addListener((tab) => {
  if (!tab.id) return;

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content/content.js', 'dist/assets/index.js']
  }, () => {
    // Give content script time to initialize
    setTimeout(() => {
      chrome.tabs.sendMessage(tab.id, { action: 'toggleSidebar' });
    }, 100);
  });
});
