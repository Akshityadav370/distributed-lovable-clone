package com.spring_learn.distributed_lovable_clone.account_service.service;

import com.spring_learn.distributed_lovable_clone.account_service.dto.subscription.CheckoutRequest;
import com.spring_learn.distributed_lovable_clone.account_service.dto.subscription.CheckoutResponse;
import com.spring_learn.distributed_lovable_clone.account_service.dto.subscription.PortalResponse;
import com.stripe.model.StripeObject;

import java.util.Map;

public interface PaymentProcessor {

    CheckoutResponse createCheckoutSessionUrl(CheckoutRequest request);

    PortalResponse openCustomerPortal();

    void handleWebhookEvent(String type, StripeObject stripeObject, Map<String, String> metadata);
}
