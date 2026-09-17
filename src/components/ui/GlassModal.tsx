import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl' };

export function GlassModal({ open, onClose, title, children, size = 'md' }: Props) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-warm-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative glass-light rounded-2xl p-6 w-full ${sizes[size]} animate-scale-in`}>
        <div className="flex items-center justify-between mb-4">
          {title && <h3 className="font-serif text-lg">{title}</h3>}
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-charcoal/5 transition-colors ml-auto" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
