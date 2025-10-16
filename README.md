# YouTube Shorts Blocker

A Chrome extension that blocks YouTube Shorts videos from appearing in your browser. This extension works at the network level to prevent Shorts from loading and also hides Shorts UI elements throughout YouTube.

## Features

- **Network-level blocking**: Uses Chrome's declarativeNetRequest API to block Shorts URLs before they load
- **UI element hiding**: Removes Shorts shelves, buttons, and tabs from YouTube pages
- **Automatic redirection**: Redirects Shorts pages to the YouTube homepage
- **Toggle control**: Enable or disable blocking through the extension popup
- **Block counter**: Track how many Shorts have been blocked
- **Lightweight**: Minimal performance impact on browsing

## Installation

### Install from Source

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked"
5. Select the folder containing this extension
6. The YouTube Shorts Blocker icon should appear in your extensions toolbar

## Usage

1. Click the extension icon in your toolbar to open the popup
2. Use the toggle switch to enable or disable Shorts blocking
3. View the counter to see how many Shorts have been blocked
4. Click "Reset Counter" to reset the block count

The extension works automatically in the background:
- Shorts URLs are blocked at the network level
- Shorts UI elements are hidden from YouTube pages
- Attempting to visit a Shorts page redirects you to YouTube's homepage

## How It Works

The extension uses multiple approaches to block YouTube Shorts:

1. **Declarative Net Request Rules**: Blocks network requests to Shorts URLs
2. **Background Service Worker**: Intercepts tab navigation and redirects Shorts pages
3. **Content Script**: Removes Shorts UI elements from the DOM
4. **CSS Rules**: Hides Shorts-related elements with display:none

## Permissions

This extension requires the following permissions:

- `declarativeNetRequest`: To block Shorts URLs at the network level
- `storage`: To save user preferences and block count
- `host_permissions` for youtube.com: To inject content scripts and monitor navigation

## Privacy

This extension:
- Does not collect any user data
- Does not send any information to external servers
- Only operates on YouTube domains
- All settings are stored locally in your browser

## Compatibility

- Chrome (Manifest V3)
- Microsoft Edge (Chromium-based)
- Other Chromium-based browsers that support Manifest V3

## License

MIT License - Feel free to use and modify as needed
