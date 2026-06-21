import { getFirebaseIdToken } from "./FirebaseUtils";

export function timeAgo(seconds: number): string {
  if (seconds < 60)          return "just now";
  if (seconds < 3600)        return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400)       return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 7 * 86400)   return `${Math.floor(seconds / 86400)}d ago`;
  if (seconds < 30 * 86400)  return `${Math.floor(seconds / (7 * 86400))}w ago`;
  if (seconds < 365 * 86400) return `${Math.floor(seconds / (30 * 86400))}mo ago`;
  return `${Math.floor(seconds / (365 * 86400))}y ago`;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

type ApiOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  timeout?: number;
  signal?: AbortSignal;
  headers? : unknown
};

export async function callAPI<T>(
  path: string,
  options: ApiOptions = {}
): Promise<T> {
  const { method = "GET", body, timeout = 10000, signal } = options;

  const controller = new AbortController();
  const abortTimeout = setTimeout(() => controller.abort(), timeout);

  try {
    let customHeaders:any = {
        "Content-Type": "application/json",
      }
    const idToken = await getFirebaseIdToken();
    if (idToken) {
        customHeaders['Authorization'] = `Bearer ${idToken}`
    }
    const response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: customHeaders,
      
      body: body ? JSON.stringify(body) : undefined,
      signal: signal ?? controller.signal,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error?.message || "API request failed");
    }
    
    return data.data;
  } catch (err:any) {
    if (err.name === "AbortError") {
      throw new Error("Request timeout");
    }

    throw new Error(err.message);
  } finally {
    clearTimeout(abortTimeout);
  }
}