import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User, Address } from '@/data/types';

const demoUser: User = {
  id: 'u-1',
  name: 'Arjun Mehta',
  email: 'arjun@example.com',
  phone: '+91 98765 43210',
  role: 'both',
  addresses: [
    { id: 'a-1', label: 'Home', line1: '42 Lakeview Lane', city: 'Bhopal', state: 'Madhya Pradesh', pincode: '462001', isDefault: true },
    { id: 'a-2', label: 'Office', line1: '18/3 MG Road', city: 'Bengaluru', state: 'Karnataka', pincode: '560001', isDefault: false },
  ] as Address[],
};

interface AuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  login: (role?: 'buyer' | 'artisan' | 'both' | 'seller', userData?: Partial<User>) => void;
  logout: () => void;
  updateRole: (role: 'buyer' | 'artisan' | 'both' | 'seller') => void;
}

const Ctx = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((role: 'buyer' | 'artisan' | 'both' | 'seller' = 'both', userData?: Partial<User>) => {
    setUser({
      ...demoUser,
      role: (userData?.role || role),
      ...(userData || {}),
    });
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const updateRole = useCallback((role: 'buyer' | 'artisan' | 'both' | 'seller') => {
    setUser(prev => prev ? { ...prev, role } : null);
  }, []);

  return (
    <Ctx.Provider value={{ user, isLoggedIn: !!user, login, logout, updateRole }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
