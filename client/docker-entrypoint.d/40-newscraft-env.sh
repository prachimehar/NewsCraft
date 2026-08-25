#!/bin/sh
set -eu

cat > /usr/share/nginx/html/env.js <<EOF
window.__NEWSCRAFT_CONFIG__ = {
  VITE_API_BASE_URL: "${VITE_API_BASE_URL:-}",
};
EOF
