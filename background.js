chrome.tabs.onUpdated.addListener((changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.includes('/checkout')) {
      chrome.action.openPopup();
    }
  });
  