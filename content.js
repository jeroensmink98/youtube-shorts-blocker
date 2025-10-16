// Content script for YouTube Shorts Blocker

(function() {
  'use strict';

  // Check if extension is enabled
  let isEnabled = true;

  chrome.runtime.sendMessage({ type: 'getSettings' }, (response) => {
    if (response && response.enabled !== undefined) {
      isEnabled = response.enabled;
    }
  });

  // Function to remove Shorts elements from the page
  function removeShortsElements() {
    if (!isEnabled) return;

    // Remove Shorts shelf on homepage
    const shortsShelf = document.querySelectorAll('ytd-reel-shelf-renderer');
    shortsShelf.forEach(element => {
      element.style.display = 'none';
      chrome.runtime.sendMessage({ type: 'shortBlocked' });
    });

    // Remove Shorts buttons in sidebar
    const shortsButtons = document.querySelectorAll('a[href*="/shorts"]');
    shortsButtons.forEach(button => {
      const parent = button.closest('ytd-guide-entry-renderer, ytd-mini-guide-entry-renderer');
      if (parent) {
        parent.style.display = 'none';
      }
    });

    // Remove Shorts tabs on channel pages
    const shortsTabs = document.querySelectorAll('yt-tab-shape[tab-title*="Shorts"], yt-tab-shape[tab-title*="shorts"]');
    shortsTabs.forEach(tab => {
      tab.style.display = 'none';
    });

    // Remove individual Shorts videos in feeds
    const shortsVideos = document.querySelectorAll('ytd-rich-item-renderer, ytd-grid-video-renderer, ytd-video-renderer');
    shortsVideos.forEach(video => {
      const link = video.querySelector('a[href*="/shorts/"]');
      if (link) {
        video.style.display = 'none';
        chrome.runtime.sendMessage({ type: 'shortBlocked' });
      }
    });
  }

  // Check if we're on a Shorts page and redirect
  function checkShortsPage() {
    if (!isEnabled) return;
    
    if (window.location.pathname.includes('/shorts/')) {
      // Redirect to homepage
      window.location.href = 'https://www.youtube.com';
    }
  }

  // Initial check
  checkShortsPage();
  
  // Run removal on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', removeShortsElements);
  } else {
    removeShortsElements();
  }

  // Use MutationObserver to handle dynamically loaded content
  const observer = new MutationObserver((mutations) => {
    removeShortsElements();
  });

  // Start observing when the body is available
  const startObserving = () => {
    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    } else {
      setTimeout(startObserving, 100);
    }
  };

  startObserving();

  // Listen for URL changes (YouTube is a SPA)
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      checkShortsPage();
      removeShortsElements();
    }
  }).observe(document, { subtree: true, childList: true });

})();
