// Background service worker for YouTube Shorts Blocker

// Listen for installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('YouTube Shorts Blocker installed');
  
  // Set default settings
  chrome.storage.sync.set({
    enabled: true,
    blockCount: 0
  });
});

// Listen for tab updates to check for Shorts URLs
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url && changeInfo.url.includes('/shorts/')) {
    chrome.storage.sync.get(['enabled'], (result) => {
      if (result.enabled !== false) {
        // Redirect to YouTube homepage or show blocked message
        chrome.tabs.update(tabId, {
          url: 'https://www.youtube.com'
        });
        
        // Increment block counter
        chrome.storage.sync.get(['blockCount'], (result) => {
          const newCount = (result.blockCount || 0) + 1;
          chrome.storage.sync.set({ blockCount: newCount });
        });
      }
    });
  }
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'shortBlocked') {
    chrome.storage.sync.get(['blockCount'], (result) => {
      const newCount = (result.blockCount || 0) + 1;
      chrome.storage.sync.set({ blockCount: newCount });
    });
  }
  
  if (message.type === 'getSettings') {
    chrome.storage.sync.get(['enabled', 'blockCount'], (result) => {
      sendResponse(result);
    });
    return true; // Will respond asynchronously
  }
});
