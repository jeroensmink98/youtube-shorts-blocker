# Testing YouTube Shorts Blocker

This document describes how to test the YouTube Shorts Blocker extension.

## Manual Testing Steps

### 1. Install the Extension

1. Open Chrome browser
2. Navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the extension folder
6. Verify the extension appears in the list with no errors

### 2. Test Network-Level Blocking

1. Try to navigate directly to a Shorts URL (e.g., `https://www.youtube.com/shorts/xyz`)
2. Expected: The page should not load or redirect to YouTube homepage
3. Check the extension popup - block counter should increment

### 3. Test UI Element Hiding

1. Go to `https://www.youtube.com`
2. Expected: No "Shorts" button in the sidebar
3. Expected: No Shorts shelf/carousel on the homepage
4. Scroll through the page - no Shorts videos should be visible

### 4. Test Channel Pages

1. Visit any YouTube channel
2. Expected: No "Shorts" tab should be visible

### 5. Test Search Results

1. Search for any content on YouTube
2. Expected: No Shorts results should appear

### 6. Test Extension Popup

1. Click the extension icon in the toolbar
2. Verify the popup opens correctly
3. Check that "Block Shorts" toggle is ON by default
4. Verify block counter shows the number of blocked Shorts

### 7. Test Toggle Functionality

1. Open extension popup
2. Turn OFF the "Block Shorts" toggle
3. Expected: Status should change to "Disabled"
4. Refresh YouTube page
5. Expected: Shorts should now be visible
6. Turn the toggle back ON
7. Expected: Shorts should be hidden again after page refresh

### 8. Test Reset Counter

1. Open extension popup
2. Click "Reset Counter"
3. Expected: Block count should reset to 0

## Automated Testing

Currently, this extension does not have automated tests. Potential testing frameworks for future implementation:

- **Puppeteer**: For end-to-end browser automation
- **Jest**: For unit testing JavaScript functions
- **Chrome Extension Testing Library**: For extension-specific testing

## Common Issues

### Extension Not Loading

- Check that all required files are present
- Verify manifest.json is valid JSON
- Check browser console for errors

### Shorts Still Appearing

- Verify extension is enabled
- Check that the toggle in popup is ON
- Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
- YouTube's DOM structure may have changed - content.js may need updates

### Network Blocking Not Working

- Verify declarativeNetRequest permission is granted
- Check Chrome's network tab to see if requests are being blocked
- Verify rules.json is valid

## Testing Different YouTube Layouts

YouTube occasionally updates its UI. Test on:
- Desktop view
- Different themes (light/dark)
- Different languages
- Signed in vs signed out

## Performance Testing

1. Open Chrome DevTools Performance tab
2. Record while browsing YouTube
3. Verify no significant performance impact from the extension
4. Check memory usage in Chrome Task Manager
