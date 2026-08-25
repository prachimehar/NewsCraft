const runtimeConfig = window.__NEWSCRAFT_CONFIG__ || {};
const API_BASE_URL =
  runtimeConfig.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  "";

export function apiUrl(path) {
  return `${API_BASE_URL}${path}`;
}

export function authHeaders() {
  const token = localStorage.getItem("authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export default API_BASE_URL;
