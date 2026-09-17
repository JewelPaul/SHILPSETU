import { forwardRef, type ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'glass';
type Size = 'sm' | 'md' | 'lg';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-terracotta text-white hover:bg-terracotta-light active:bg-terracotta-dark',
  secondary: 'bg-charcoal text-ivory hover:bg-warm-black',
  ghost: 'bg-transparent text-charcoal hover:bg-charcoal/5',
  glass: 'glass text-charcoal hover:bg-white/20',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3.5 text-sm',
};

export const GlassButton = forwardRef<HTMLButtonElement, Props>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center gap-2 font-sans font-medium rounded-full transition-all duration-200 tracking-wide ${variantStyles[variant]} ${sizeStyles[size]} disabled:opacity-40 disabled:pointer-events-none ${className}`}
      {...props}
    >
      {children}
    </button>
  )
);

GlassButton.displayName = 'GlassButton';
