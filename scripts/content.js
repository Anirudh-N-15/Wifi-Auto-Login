/**
 * This function attempts to log in automatically.
 * It retrieves saved credentials and fills them into the login form.
 */
function autoLogin() {
  console.log("Auto-Login Script: Running on page.");

  // --- Step 1: Define the selectors for your login page ---
  // Selectors for username and password based on your HTML
  const USERNAME_SELECTOR = '#ft_un'; // Using the id "ft_un"
  const PASSWORD_SELECTOR = '#ft_pd'; // Using the id "ft_pd"

  // CORRECTED selector for the "Continue" input field
  const LOGIN_BUTTON_SELECTOR = 'input[type="submit"]';

  // --- Step 2: Retrieve the saved credentials from Chrome storage ---
  chrome.storage.sync.get(['username', 'password'], function (data) {
    if (data.username && data.password) {
      console.log("Auto-Login Script: Credentials found in storage.");

      // --- Step 3: Find the form elements on the page ---
      const usernameField = document.querySelector(USERNAME_SELECTOR);
      const passwordField = document.querySelector(PASSWORD_SELECTOR);
      const loginButton = document.querySelector(LOGIN_BUTTON_SELECTOR);

      // --- Step 4: Fill the form and click the button ---
      // Check if all three elements were successfully found on the page
      if (usernameField && passwordField && loginButton) {
        console.log("Auto-Login Script: All form elements found. Attempting to log in.");

        // Fill in the username and password
        usernameField.value = data.username;
        passwordField.value = data.password;

        // Click the login button to submit the form
        loginButton.click();
      } else {
        console.error("Auto-Login Script: Could not find one or more form elements. Check your selectors.");
      }
    } else {
      console.log("Auto-Login Script: Credentials not found in storage. Please save them via the popup.");
    }
  });
}

// Run the function
autoLogin();