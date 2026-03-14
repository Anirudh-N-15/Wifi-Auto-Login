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


## 🖥️ Bash Script (Terminal Login)

If you prefer logging in from the terminal (without a browser), use the included `wifi_login.sh` script. It detects the default gateway IP from your network and sends a login request via `curl`.

### Prerequisites
- `curl` must be installed.
- A Linux or macOS system with `ip`, `route`, or `netstat` available.

### Usage

```bash
chmod +x wifi_login.sh
./wifi_login.sh <user_id> <password>
```

### Example

```bash
./wifi_login.sh john.doe MySecretPass
```

The script will:
1. Detect your network's default gateway IP.
2. Warn you if the gateway is not in the known list (but still attempt login).
3. Send a `curl` POST request with your credentials to `http://<gateway_ip>/login`.
4. Report whether the login succeeded or failed.

---

📌 Example Use Case

Universities/Institutes – Auto-login to campus Wi-Fi without re-entering credentials.

MNC Offices – Skip repetitive captive portal authentication every morning.

🛡️ Disclaimer

This extension is designed for personal productivity.

Use only on networks where you are authorized to access.

Do not use to bypass security policies or access systems without permission.
