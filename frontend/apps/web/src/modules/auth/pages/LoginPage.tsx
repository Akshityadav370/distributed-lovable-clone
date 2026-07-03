import { AuthLayout } from '@/components/layout/AuthLayout';
import { LoginForm } from '../components/LoginForm';

export function LoginPage() {
  return (
    <AuthLayout title="Welcome back" subtitle="Log in to keep building.">
      <LoginForm />
    </AuthLayout>
  );
}
