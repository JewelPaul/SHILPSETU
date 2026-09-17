import { forwardRef, type HTMLAttributes } from 'react';

type Variant = 'default' | 'light' | 'dark';

interface Props extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  hover?: boolean;
}

const variantClass: Record<Variant, string> = {
  default: 'glass',
  light: 'glass-light',
  dark: 'glass-dark',
};

export const GlassSurface = forwardRef<HTMLDivElement, Props>(
  ({ variant = 'default', hover, className = '', children, ...props }, ref) => (
    <div
      ref={ref}
      className={`${variantClass[variant]} rounded-2xl ${hover ? 'transition-all duration-300 hover:shadow-lg hover:scale-[1.01]' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
);

GlassSurface.displayName = 'GlassSurface';
