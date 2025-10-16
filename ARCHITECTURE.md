# Architecture Overview

This document describes the technical architecture of the YouTube Shorts Blocker extension.

## File Structure

```
youtube-shorts-blocker/
├── manifest.json          # Extension manifest (Manifest V3)
├── background.js          # Background service worker
├── content.js             # Content script injected into YouTube pages
├── content.css            # CSS to hide Shorts UI elements
├── popup.html             # Extension popup UI
├── popup.js               # Popup functionality
├── rules.json             # declarativeNetRequest blocking rules
├── icons/                 # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── README.md              # User documentation
├── TESTING.md             # Testing guide
└── ARCHITECTURE.md        # This file
```

## Components

### 1. Manifest (manifest.json)

The manifest uses **Manifest V3**, which is required for modern Chrome extensions.

**Key permissions:**
- `declarativeNetRequest`: Enables network-level blocking
- `storage`: Stores user preferences and statistics
- `host_permissions`: Access to youtube.com and googlevideo.com

### 2. Network Blocking (rules.json + declarativeNetRequest)

Uses Chrome's **declarativeNetRequest API** to block Shorts at the network level before they load.

**Rules:**
1. Block any URL containing `/shorts/`
2. Block requests to `youtube.com/shorts`
3. Regex-based blocking for Shorts URLs

**Advantages:**
- Very efficient (no JavaScript execution)
- Blocks before page load
- Low performance impact
- Works across all tabs automatically

### 3. Background Service Worker (background.js)

Runs in the background and handles:
- Extension lifecycle (installation, updates)
- Tab navigation monitoring
- Redirecting Shorts pages to YouTube homepage
- Managing storage (settings, statistics)
- Communication with content scripts and popup

**Key functions:**
- `chrome.runtime.onInstalled`: Initialize default settings
- `chrome.tabs.onUpdated`: Monitor tab navigation for Shorts URLs
- `chrome.runtime.onMessage`: Handle messages from content scripts

### 4. Content Script (content.js)

Injected into every YouTube page to:
- Remove Shorts UI elements from the DOM
- Redirect if on a Shorts page
- Use MutationObserver to handle dynamically loaded content
- Communicate with background script

**Runs at:** `document_start` (before page loads)

**Key features:**
- Removes Shorts shelf on homepage
- Hides Shorts button in sidebar
- Removes Shorts tabs on channel pages
- Filters out individual Shorts videos from feeds
- Monitors URL changes (YouTube is a Single Page Application)

### 5. CSS Hiding (content.css)

Provides additional UI hiding using CSS `display: none` rules.

**Target elements:**
- `ytd-reel-shelf-renderer`: Shorts shelf
- Shorts navigation buttons
- Channel Shorts tabs
- Individual Shorts videos in feeds

### 6. User Interface (popup.html + popup.js)

Provides a simple popup interface with:
- Enable/disable toggle
- Status indicator
- Block counter
- Reset button

**Functionality:**
- Reads settings from `chrome.storage.sync`
- Updates settings when toggle changes
- Reloads YouTube tabs when settings change
- Displays blocking statistics

## Data Flow

### When User Visits YouTube:

1. **Network Level**: declarativeNetRequest rules block Shorts URLs immediately
2. **Content Script**: Injected at document_start
3. **DOM Manipulation**: Content script removes Shorts elements
4. **CSS Rules**: Applied to hide remaining elements
5. **MutationObserver**: Watches for dynamically added content

### When User Toggles Extension:

1. User clicks extension icon → popup opens
2. User toggles switch
3. Setting saved to `chrome.storage.sync`
4. All YouTube tabs automatically reload
5. Content scripts apply new settings

### When Shorts Page is Accessed:

1. **First line of defense**: declarativeNetRequest blocks the request
2. **Second line**: Background worker detects URL and redirects
3. **Third line**: Content script checks URL and redirects
4. Block counter increments

## Storage Schema

```javascript
{
  enabled: boolean,      // Whether blocking is active (default: true)
  blockCount: number     // Number of Shorts blocked (default: 0)
}
```

Stored using `chrome.storage.sync` so settings sync across devices.

## Performance Considerations

1. **Minimal overhead**: declarativeNetRequest is very efficient
2. **Early injection**: Content script runs at `document_start`
3. **Efficient selectors**: CSS rules use specific YouTube selectors
4. **Throttled observation**: MutationObserver only triggers on changes
5. **No external dependencies**: Pure JavaScript, no frameworks

## Security

- **No data collection**: Extension doesn't send any data externally
- **Minimal permissions**: Only requests necessary permissions
- **Local storage**: All data stored locally in browser
- **No remote code**: All code bundled with extension

## Compatibility

- **Chrome**: Manifest V3 (Chrome 88+)
- **Edge**: Chromium-based Edge
- **Brave**: Should work with Chromium base
- **Opera**: Chromium-based Opera

## Future Enhancements

Potential improvements:
1. Options page for advanced settings
2. Whitelist for specific channels
3. Statistics dashboard
4. Export/import settings
5. Automated testing suite
6. Support for other video platforms
7. Customizable blocking behavior
