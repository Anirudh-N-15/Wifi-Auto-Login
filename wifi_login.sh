#!/usr/bin/env bash
#
# wifi_login.sh — Detect the captive-portal gateway IP and log in via curl.
#
# Usage:
#   ./wifi_login.sh <user_id> <password>
#
# The script discovers the default gateway IP, verifies it is a known
# captive-portal address, fetches the login page, and POSTs the credentials.

set -euo pipefail

# ---------- known captive-portal gateways (keep in sync with background.js) --
KNOWN_GATEWAYS=("192.168.42.1" "192.168.24.1" "172.16.32.1")

# ---------- parse arguments ---------------------------------------------------
if [ "$#" -lt 2 ]; then
  echo "Usage: $0 <user_id> <password>"
  exit 1
fi

USER_ID="$1"
PASSWD="$2"

# ---------- detect default gateway IP -----------------------------------------
get_gateway_ip() {
  local gw=""

  # Try 'ip route' first (Linux)
  if command -v ip &>/dev/null; then
    gw=$(ip route | awk '/default/ {print $3; exit}')
  fi

  # Fallback to 'route' (macOS / older Linux)
  if [ -z "$gw" ] && command -v route &>/dev/null; then
    gw=$(route -n get default 2>/dev/null | awk '/gateway:/ {print $2}')
  fi

  # Fallback to 'netstat' (broad compatibility)
  if [ -z "$gw" ] && command -v netstat &>/dev/null; then
    gw=$(netstat -rn | awk '/^0\.0\.0\.0/ {print $2; exit}')
  fi

  echo "$gw"
}

GATEWAY_IP=$(get_gateway_ip)

if [ -z "$GATEWAY_IP" ]; then
  echo "Error: Could not determine the default gateway IP."
  exit 1
fi

echo "Detected gateway IP: $GATEWAY_IP"

# ---------- verify that the gateway is a known captive portal -----------------
is_known=false
for known in "${KNOWN_GATEWAYS[@]}"; do
  if [ "$GATEWAY_IP" = "$known" ]; then
    is_known=true
    break
  fi
done

if [ "$is_known" = false ]; then
  echo "Warning: $GATEWAY_IP is not in the known gateway list (${KNOWN_GATEWAYS[*]})."
  echo "Proceeding anyway — the portal may still accept the request."
fi

LOGIN_URL="http://${GATEWAY_IP}/login"

# ---------- send the login request --------------------------------------------
echo "Sending login request to $LOGIN_URL ..."

CURL_ERR=$(mktemp)
HTTP_RESPONSE=$(curl --silent --output /dev/null --write-out "%{http_code}" \
  --max-time 10 \
  --data-urlencode "ft_un=${USER_ID}" \
  --data-urlencode "ft_pd=${PASSWD}" \
  "$LOGIN_URL" 2>"$CURL_ERR") || true
CURL_ERR_MSG=$(cat "$CURL_ERR")
rm -f "$CURL_ERR"

if ! [[ "$HTTP_RESPONSE" =~ ^[0-9]+$ ]]; then
  echo "Error: curl request failed."
  [ -n "$CURL_ERR_MSG" ] && echo "Details: $CURL_ERR_MSG"
  exit 1
fi

echo "HTTP response code: $HTTP_RESPONSE"

if [ "$HTTP_RESPONSE" -ge 200 ] && [ "$HTTP_RESPONSE" -lt 400 ]; then
  echo "Login request sent successfully."
else
  echo "Login may have failed (HTTP $HTTP_RESPONSE). Check your credentials or network."
  exit 1
fi
