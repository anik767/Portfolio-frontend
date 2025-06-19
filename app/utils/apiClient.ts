// utils/apiClient.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function apiFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Unauthorized: No token found');
  }

  const headers = new Headers(options.headers || {});
  headers.set('Authorization', `Bearer ${token}`);
  headers.set('Accept', 'application/json');

  const opts: RequestInit = {
    ...options,
    headers,
  };

  // Prepend BASE_URL if path is relative (starts with "/")
  const url = path.startsWith('http') ? path : `${BASE_URL}${path}`;

  return fetch(url, opts);
}
