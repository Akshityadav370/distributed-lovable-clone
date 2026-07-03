import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-1.5 whitespace-nowrap font-medium transition-all duration-150 disabled:pointer-events-none disabled:opacity-50 select-none',
  {
    variants: {
      variant: {
        primary:
          'bg-canvas text-ink border border-border rounded-md shadow-[0_1px_0_rgba(0,0,0,0.02),inset_0_-1px_2px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(0,0,0,0.015))] hover:bg-[rgba(0,0,0,0.02)] active:shadow-[inset_0_1px_3px_rgba(0,0,0,0.08)]',
        secondary:
          'bg-transparent text-ink border border-border rounded-md hover:bg-[rgba(0,0,0,0.04)]',
        pill: 'bg-canvas text-ink border border-border rounded-full shadow-[0_1px_0_rgba(0,0,0,0.02),inset_0_-1px_2px_rgba(0,0,0,0.04)] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(0,0,0,0.015))]',
        accent:
          'bg-accent text-white border border-accent-border rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(0,0,0,0.06))] hover:brightness-95',
        ghost: 'bg-transparent text-muted-fg hover:text-ink hover:bg-[rgba(0,0,0,0.04)] rounded-md',
        icon: 'rounded-full bg-canvas text-ink border border-border shadow-[0_1px_0.5px_rgba(0,0,0,0.05),inset_0_-2px_1px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(0,0,0,0.04))] hover:brightness-95',
      },
      size: {
        sm: 'h-7 px-3 text-[13px]',
        md: 'h-8 px-4 text-[14px]',
        lg: 'h-9 px-5 text-[14px]',
        icon: 'h-8 w-8 shrink-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
