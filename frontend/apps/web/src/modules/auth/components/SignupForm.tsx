import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { useSignupMutation } from '../auth.api';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { paths } from '@/routes/paths';

const schema = z.object({
  name: z.string().min(1, 'Name is required').max(30),
  username: z.string().email('Enter a valid email'),
  password: z.string().min(4, 'Password must be at least 4 characters'),
});

type FormValues = z.infer<typeof schema>;

export function SignupForm() {
  const navigate = useNavigate();
  const [signup, { isLoading, error }] = useSignupMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      await signup(values).unwrap();
      navigate(paths.dashboard);
    } catch {
      // surfaced via `error` below
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Ada Lovelace" {...register('name')} />
        {errors.name && <p className="text-[12px] text-red-500">{errors.name.message}</p>}
      </div>
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
      {error && <p className="text-[12px] text-red-500">Couldn't create your account. Try a different email.</p>}
      <Button type="submit" variant="accent" size="lg" disabled={isLoading} className="mt-2 w-full">
        {isLoading ? 'Creating account…' : 'Get started'}
      </Button>
      <p className="text-center text-[12.5px] text-muted-fg">
        Already have an account?{' '}
        <Link to={paths.login} className="font-medium text-ink underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
