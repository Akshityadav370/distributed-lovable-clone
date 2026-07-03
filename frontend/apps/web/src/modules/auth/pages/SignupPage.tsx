import { AuthLayout } from '@/components/layout/AuthLayout';
import { SignupForm } from '../components/SignupForm';

export function SignupPage() {
  return (
    <AuthLayout title="Build something Lovable" subtitle="Create apps and websites by chatting with AI.">
      <SignupForm />
    </AuthLayout>
  );
}
