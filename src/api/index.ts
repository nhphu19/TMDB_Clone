const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

interface RequestOptions extends RequestInit {
    body?: string;
}

const request = async <T>(endpoint: string, options: RequestOptions): Promise<T> => {
    const url = `${BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${API_KEY}`;

    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

export const apiGet = <T>(endpoint: string): Promise<T> => request<T>(endpoint, { method: 'GET' });

export const apiPost = <T>(endpoint: string, body: unknown): Promise<T> =>
    request<T>(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
