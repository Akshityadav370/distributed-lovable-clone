import { api } from '@/store/api';
import { GATEWAY } from '@/lib/http/gateway';
import { setCredentials, logout, type AuthResponse } from '@/store/auth.slice';
import type { LoginRequest, SignupRequest } from './auth.types';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<AuthResponse, SignupRequest>({
      query: (body) => ({ url: `${GATEWAY.account}/auth/signup`, method: 'POST', body }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setCredentials(data));
      },
    }),
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({ url: `${GATEWAY.account}/auth/login`, method: 'POST', body }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setCredentials(data));
      },
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = authApi;
export { logout };
