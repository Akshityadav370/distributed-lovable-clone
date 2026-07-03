export interface PlanDto {
  id: number;
  name: string;
  maxProjects: number;
  maxTokensPerDay: number;
  unlimitedAi: boolean;
  price: string;
}

export interface SubscriptionResponse {
  plan: PlanDto;
  status: string;
  currentPeriodEnd: string;
  tokensUsedThisCycle: number;
}

export interface CheckoutRequest {
  planId: number;
}

export interface CheckoutResponse {
  checkoutUrl: string;
}

export interface PortalResponse {
  portalUrl: string;
}
