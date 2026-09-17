import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface RecentlyViewedContextValue {
  ids: string[];
  addViewed: (id: string) => void;
}

const Ctx = createContext<RecentlyViewedContextValue | null>(null);

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  const addViewed = useCallback((id: string) => {
    setIds(prev => {
      const filtered = prev.filter(x => x !== id);
      return [id, ...filtered].slice(0, 20); // keep last 20
    });
  }, []);

  return <Ctx.Provider value={{ ids, addViewed }}>{children}</Ctx.Provider>;
}

export function useRecentlyViewed() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useRecentlyViewed must be used within RecentlyViewedProvider');
  return ctx;
}
