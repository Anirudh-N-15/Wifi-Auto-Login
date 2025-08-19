// This is the main listener that waits for a tab to be updated.
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // We only want to act when the tab has finished loading.
    if (changeInfo.status === 'complete' && tab.url) {
  
      // List of all possible IP addresses for the login page.
      const targetDomains = ["http://192.168.42.1", "http://192.168.24.1", "http://172.16.32.1"];
  
      // Check if the tab's URL starts with ANY of the IPs in the list.
      const isTargetPage = targetDomains.some(domain => tab.url.startsWith(domain));
  
      if (isTargetPage) {
        console.log(`Target page detected: ${tab.url}. Injecting content script.`);
  
        // If it matches, inject the content.js script into the tab.
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ['scripts/content.js']
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