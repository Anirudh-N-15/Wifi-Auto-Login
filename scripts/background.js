// This is the main listener that waits for a tab to be updated.
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // We only want to act when the tab has finished loading.
    // 'changeInfo.status' will be 'complete' when the page is fully loaded.
    if (changeInfo.status === 'complete' && tab.url) {
  
      // IMPORTANT: You must replace this with your Wi-Fi login domain.
      // It should match the domain you used in your manifest.json.
      const targetDomain = "http://192.168.42.1";
  
      // Check if the tab's URL includes your target domain.
      if (tab.url.includes(targetDomain)) {
        console.log(`Target page detected: ${tab.url}. Injecting content script.`);
  
        // If it matches, inject the content.js script into the tab.
        chrome.scripting.executeScript({
          target: { tabId: tabId }, // Specify which tab to inject into
          files: ['scripts/content.js']    // Specify which file to inject
        })
        .then(() => {
          console.log("Successfully injected the content script.");
        })
        .catch(err => {
          console.error("Failed to inject content script:", err);
        });
      }
    }
  });