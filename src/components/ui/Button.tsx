import { cn } from '@/lib/utils';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md';
};

export function buttonStyles({
  variant = 'primary',
  size = 'md',
  className = ''
}: {
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  className?: string;
}) {
  return cn(
    'inline-flex items-center justify-center rounded-full font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong',
    size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm',
    variant === 'primary' && 'bg-accent text-black hover:bg-accent-strong',
    variant === 'secondary' && 'border border-white/70 bg-white/80 text-ink hover:bg-white',
    variant === 'ghost' && 'bg-transparent text-ink hover:bg-white/70',
    className
  );
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  return <button className={buttonStyles({ variant, size, className })} {...props} />;
}
