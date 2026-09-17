import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface WishlistContextValue {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  count: number;
}

const Ctx = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  const toggle = useCallback((id: string) => {
    setIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }, []);

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  return <Ctx.Provider value={{ ids, toggle, has, count: ids.length }}>{children}</Ctx.Provider>;
}

export function useWishlist() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
