# AutoLogin Extension

A lightweight browser extension that automates the login process for institutional or corporate Wi-Fi networks that require authentication via a captive portal (commonly hosted at a specific IP address).

Instead of typing your credentials every time you connect to Wi-Fi, this extension injects a script into the authentication page and logs you in automatically.

---

## ✨ Features
- Detects the authentication page at the configured IP.
- Auto-fills your username and password.
- Submits the login form instantly.
- Works for repeated logins without user intervention.
- Minimal setup, no extra dependencies.

---

## ⚙️ How It Works
1. On connecting to your institute/MNC Wi-Fi, the captive portal opens in the browser.
2. The extension listens for requests to the **authentication IP page**.
3. When detected, it injects a custom script that:
   - Populates the login form fields.
   - Clicks the login/submit button automatically.
4. You’re connected without touching a key.

---

## 🚀 Installation
1. Clone or download this repository.
2. Open your browser’s extension manager (e.g., Chrome: `chrome://extensions/`).
3. Enable **Developer Mode**.
4. Click **Load Unpacked** and select the project folder.
5. Update the script with your credentials (see below).

---
