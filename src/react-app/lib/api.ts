const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") ??
  (window.location.origin.replace(/\/+$/, "") || "");

export async function getJson<T>(path: string): Promise<T> {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${API_BASE}${normalizedPath}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

