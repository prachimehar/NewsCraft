const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export function apiUrl(path) {
  return `${API_BASE_URL}${path}`;
}

export default API_BASE_URL;
