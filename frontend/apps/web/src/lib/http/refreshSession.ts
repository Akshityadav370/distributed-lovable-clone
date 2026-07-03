import { getApiBaseUrl } from '@/lib/utils/env';
import { GATEWAY } from '@/lib/http/gateway';
import { setCredentials, logout, type AuthResponse } from '@/store/auth.slice';
import { store } from '@/store';

let inFlight: Promise<boolean> | null = null;

/**
 * Shared refresh-in-flight guard used by both RTK Query's baseQueryWithReauth
 * and the raw authedFetch (chat streaming) so a 401 on two concurrent requests
 * triggers exactly one /auth/refresh call, not a race of two.
 */
export function refreshSession(): Promise<boolean> {
  if (inFlight) return inFlight;

  inFlight = (async () => {
    const refreshToken = store.getState().auth.refreshToken;
    if (!refreshToken) return false;

    const res = await fetch(`${getApiBaseUrl()}${GATEWAY.account}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      store.dispatch(logout());
      return false;
    }

    const data = (await res.json()) as AuthResponse;
    store.dispatch(setCredentials(data));
    return true;
  })().finally(() => {
    inFlight = null;
  });

  return inFlight;
}
