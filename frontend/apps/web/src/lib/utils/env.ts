declare global {
  interface Window {
    __RUNTIME_CONFIG__?: { API_BASE_URL?: string };
  }
}

export function getApiBaseUrl(): string {
  // Note: an explicit "" is a valid, meaningful value (relative URLs, for
  // proxying dev requests through Vite's dev server) -- so this can't use
  // `||` chaining, which would treat "" as unset and fall through.
  const runtimeUrl = window.__RUNTIME_CONFIG__?.API_BASE_URL;
  if (runtimeUrl !== undefined && runtimeUrl !== '') return runtimeUrl;

  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl !== undefined) return envUrl;

  return 'http://localhost:8080';
}
