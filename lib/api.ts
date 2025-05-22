import { API_URL } from './config';

export const fetchFromApi = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const res = await fetch(`${API_URL}/${endpoint}`, options);
  if (!res.ok) {
    const errorText = await res.text().catch(() => '');
    throw new Error(`API fetch error: ${res.status} ${res.statusText} - ${errorText}`);
  }
  try {
    return await res.json();
  } catch {
    throw new Error('Failed to parse JSON response from API');
  }
};

export const postToApi = async (
  endpoint: string,
  data: any,
  options: RequestInit = {}
): Promise<any> => {
  const fetchOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    body: JSON.stringify(data),
    ...options,
  };

  const res = await fetch(`${API_URL}/${endpoint}`, fetchOptions);
  if (!res.ok) {
    const errorText = await res.text().catch(() => '');
    throw new Error(`API post error: ${res.status} ${res.statusText} - ${errorText}`);
  }
  try {
    return await res.json();
  } catch {
    throw new Error('Failed to parse JSON response from API');
  }
};
