const CSRF_PROTECTED_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE'];
let csrfCookiePromise: Promise<void> | null = null;

/**
 * Read a cookie value by name
 */
function getCookie(name: string): string | null {
  const cookieString = document.cookie;
  const cookies = cookieString.split(';');
  for (const cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === name) return decodeURIComponent(value);
  }
  return null;
}

/**
 * Ensure CSRF cookie is fetched from backend (Laravel Sanctum)
 */
async function fetchCsrfCookie(baseUrl: string) {
  if (!csrfCookiePromise) {
    csrfCookiePromise = fetch(`${baseUrl.replace(/\/$/, '')}/sanctum/csrf-cookie`, {
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) throw new Error('Failed to fetch CSRF cookie');
    }).finally(() => {
      csrfCookiePromise = null;
    });
  }
  return csrfCookiePromise;
}

/**
 * Main API fetch function for all HTTP requests
 */
export async function apiFetch(
  url: string,
  options: RequestInit = {},
  baseUrl = process.env.NEXT_PUBLIC_API_URL ?? ''
) {
  const method = (options.method ?? 'GET').toUpperCase();

  // Step 1: Ensure CSRF cookie for state-changing methods
  if (CSRF_PROTECTED_METHODS.includes(method)) {
    await fetchCsrfCookie(baseUrl);
  }

  const fullUrl = url.startsWith('http') ? url : `${baseUrl.replace(/\/$/, '')}${url}`;

  const headers = new Headers(options.headers || {});

  // Step 2: Only set 'Content-Type' manually for JSON, not FormData
  const isFormData = options.body instanceof FormData;
  if (!headers.has('Content-Type') && !isFormData && ['POST', 'PUT', 'PATCH'].includes(method)) {
    headers.set('Content-Type', 'application/json');
  }

  // Step 3: Set XSRF token from cookie into header
  const csrfToken = getCookie('XSRF-TOKEN');
  if (csrfToken) {
    headers.set('X-XSRF-TOKEN', csrfToken);
  }

  // Always accept JSON
  if (!headers.has('Accept')) headers.set('Accept', 'application/json');

  const response = await fetch(fullUrl, {
    ...options,
    method,
    headers,
    credentials: 'include', // important for sending cookies
  });

  // Step 4: Handle response and errors
  if (!response.ok) {
    let errorMessage = `HTTP ${response.status} - ${response.statusText}`;
    try {
      const errorData = await response.json();
      if (typeof errorData === 'object' && errorData?.message) {
        errorMessage = errorData.message;
      } else if (typeof errorData === 'string') {
        errorMessage = errorData;
      }
    } catch {
      // response was not JSON
    }
    throw new Error(errorMessage);
  }

  // Step 5: Return parsed JSON
  return response.json();
}
