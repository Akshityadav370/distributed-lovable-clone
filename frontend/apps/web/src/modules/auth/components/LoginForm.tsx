import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../auth.api';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { paths } from '@/routes/paths';

const schema = z.object({
  username: z.string().email('Enter a valid email'),
  password: z.string().min(4, 'Password must be at least 4 characters'),
});

type FormValues = z.infer<typeof schema>;

export function LoginForm() {
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      await login(values).unwrap();
      navigate(paths.dashboard);
    } catch {
      // surfaced via `error` below
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="username">Email</Label>
        <Input id="username" type="email" placeholder="you@example.com" {...register('username')} />
        {errors.username && <p className="text-[12px] text-red-500">{errors.username.message}</p>}
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="••••••••" {...register('password')} />
        {errors.password && <p className="text-[12px] text-red-500">{errors.password.message}</p>}
      </div>
      {error && <p className="text-[12px] text-red-500">Invalid email or password.</p>}
      <Button type="submit" variant="accent" size="lg" disabled={isLoading} className="mt-2 w-full">
        {isLoading ? 'Logging in…' : 'Log in'}
      </Button>
    </form>
  );
}
