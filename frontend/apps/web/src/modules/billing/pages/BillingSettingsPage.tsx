import { useGetSubscriptionQuery, useOpenPortalMutation } from '../billing.api';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export function BillingSettingsPage() {
  const { data: subscription, isLoading } = useGetSubscriptionQuery();
  const [openPortal, { isLoading: isOpeningPortal }] = useOpenPortalMutation();

  const handleManageBilling = async () => {
    const { portalUrl } = await openPortal().unwrap();
    window.location.href = portalUrl;
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="mb-1 text-[26px] font-semibold tracking-tight text-ink">Billing</h1>
        <p className="mb-8 text-[14px] text-muted-fg">Manage your plan and usage.</p>

        {isLoading || !subscription ? (
          <Skeleton className="h-40 w-full rounded-card" />
        ) : (
          <div className="rounded-card border border-border-subtle bg-canvas p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-[18px] font-semibold text-ink">{subscription.plan.name}</div>
                <div className="text-[13px] text-muted-fg">{subscription.plan.price} · {subscription.status}</div>
              </div>
              <Button variant="primary" onClick={handleManageBilling} disabled={isOpeningPortal}>
                {isOpeningPortal ? 'Opening…' : 'Manage billing'}
              </Button>
            </div>

            <div className="flex flex-col gap-3 border-t border-border-subtle pt-4 text-[13px] text-muted-fg">
              <div className="flex justify-between">
                <span>Projects</span>
                <span>Up to {subscription.plan.maxProjects}</span>
              </div>
              <div className="flex justify-between">
                <span>AI usage this cycle</span>
                <span>
                  {subscription.plan.unlimitedAi
                    ? 'Unlimited'
                    : `${subscription.tokensUsedThisCycle.toLocaleString()} tokens used`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Renews</span>
                <span>{new Date(subscription.currentPeriodEnd).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
