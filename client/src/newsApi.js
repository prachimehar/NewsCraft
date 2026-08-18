import { apiUrl } from "./api";

export async function fetchNews(path) {
  const response = await fetch(apiUrl(path));
  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(body?.message || "Failed to fetch news");
  }

  return body;
}
