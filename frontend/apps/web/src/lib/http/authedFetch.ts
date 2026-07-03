import { getApiBaseUrl } from '@/lib/utils/env';
import { refreshSession } from '@/lib/http/refreshSession';
import { store } from '@/store';

/**
 * Raw fetch wrapper for requests that need the raw Response (streaming bodies),
 * where fetchBaseQuery can't be used. Shares the same refresh mutex as
 * store/api.ts's baseQueryWithReauth.
 */
export async function authedFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const withAuth = (token: string | null): RequestInit => ({
    ...init,
    headers: {
      ...init.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const url = path.startsWith('http') ? path : `${getApiBaseUrl()}${path}`;
  const token = store.getState().auth.token;
  const res = await fetch(url, withAuth(token));

  if (res.status !== 401) return res;

  const refreshed = await refreshSession();
  if (!refreshed) return res;

  return fetch(url, withAuth(store.getState().auth.token));
}
