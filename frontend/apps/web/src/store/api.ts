import { createApi, fetchBaseQuery, type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { getApiBaseUrl } from '@/lib/utils/env';
import { refreshSession } from '@/lib/http/refreshSession';
import type { RootState } from '@/store';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: getApiBaseUrl(),
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  apiThunk,
  extra
) => {
  let result = await rawBaseQuery(args, apiThunk, extra);

  if (result.error?.status === 401) {
    const refreshed = await refreshSession();
    if (refreshed) {
      result = await rawBaseQuery(args, apiThunk, extra);
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Subscription', 'Project', 'ProjectMembers', 'FileTree', 'FileContent', 'ChatHistory'],
  endpoints: () => ({}),
});
