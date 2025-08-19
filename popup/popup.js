document.addEventListener('DOMContentLoaded', function() {

    const saveButton = document.getElementById('saveBtn');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const statusDiv = document.getElementById('status');

    // chrome.storage.sync.get is an asynchronous operation
    chrome.storage.sync.get(['username', 'password'], function(data) {
        // If found in storage fill username and passwd
        if (data.username) {
            usernameInput.value = data.username;
        }
        if (data.password) {
            passwordInput.value = data.password;
        }
    });

    saveButton.addEventListener('click', function() {
        const username = usernameInput.value;
        const password = passwordInput.value;

        if (username && password) {
            // Save the credentials using the chrome.storage.sync API
            chrome.storage.sync.set({
                'username': username,
                'password': password
            }, function() {
                // This function is a callback that runs after the save is complete
                statusDiv.textContent = 'Credentials saved!';
                
                // Clear the status message after 3 seconds
                setTimeout(function() {
                    statusDiv.textContent = '';
                }, 3000);
            });
        } else {
            // If fields are empty, show an error message
            statusDiv.textContent = 'Please enter both fields.';
            statusDiv.style.color = 'red'; // Change color for error

            setTimeout(function() {
                statusDiv.textContent = '';
                statusDiv.style.color = '#28a745'; // Reset color
            }, 3000);
        }
    });
});