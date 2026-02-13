const API_URL = import.meta.env.VITE_API_URL;

const api = async <T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = (() => {
    const t = localStorage.getItem("token");
    return t && t !== "null" && t !== "undefined" ? t : null;
  })();

  const isPublic =
    path.includes("/login") ||
    path.includes("/register");

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(!isPublic && token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Request failed");
  }

  return res.json();
};

export default api;