// Popup script for YouTube Shorts Blocker

document.addEventListener('DOMContentLoaded', () => {
  const enableToggle = document.getElementById('enableToggle');
  const statusText = document.getElementById('statusText');
  const blockCount = document.getElementById('blockCount');
  const resetButton = document.getElementById('resetButton');

  // Load current settings
  chrome.storage.sync.get(['enabled', 'blockCount'], (result) => {
    const isEnabled = result.enabled !== false; // Default to true
    enableToggle.checked = isEnabled;
    statusText.textContent = isEnabled ? 'Active' : 'Disabled';
    statusText.style.color = isEnabled ? '#4CAF50' : '#dc3545';
    blockCount.textContent = result.blockCount || 0;
  });

  // Handle toggle change
  enableToggle.addEventListener('change', () => {
    const isEnabled = enableToggle.checked;
    chrome.storage.sync.set({ enabled: isEnabled });
    statusText.textContent = isEnabled ? 'Active' : 'Disabled';
    statusText.style.color = isEnabled ? '#4CAF50' : '#dc3545';
    
    // Reload all YouTube tabs to apply changes
    chrome.tabs.query({ url: '*://*.youtube.com/*' }, (tabs) => {
      tabs.forEach(tab => {
        chrome.tabs.reload(tab.id);
      });
    });
  });

  // Handle reset button
  resetButton.addEventListener('click', () => {
    chrome.storage.sync.set({ blockCount: 0 });
    blockCount.textContent = '0';
  });
});
