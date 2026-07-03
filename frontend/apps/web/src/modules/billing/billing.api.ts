import { api } from '@/store/api';
import { GATEWAY } from '@/lib/http/gateway';
import type { CheckoutRequest, CheckoutResponse, PortalResponse, SubscriptionResponse } from './billing.types';

export const billingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSubscription: builder.query<SubscriptionResponse, void>({
      query: () => `${GATEWAY.account}/api/me/subscription`,
      providesTags: ['Subscription'],
    }),
    createCheckout: builder.mutation<CheckoutResponse, CheckoutRequest>({
      query: (body) => ({ url: `${GATEWAY.account}/api/payments/checkout`, method: 'POST', body }),
    }),
    openPortal: builder.mutation<PortalResponse, void>({
      query: () => ({ url: `${GATEWAY.account}/api/payments/portal`, method: 'POST' }),
    }),
  }),
});

export const { useGetSubscriptionQuery, useCreateCheckoutMutation, useOpenPortalMutation } = billingApi;
