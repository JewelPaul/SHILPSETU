import { useState, useEffect, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Warehouse,
  IndianRupee,
  UserCircle,
  Menu,
  X,
  ArrowLeft,
  ShoppingBag,
  Briefcase,
  Sparkles,
} from 'lucide-react';
import { PageLayout } from './PageLayout';

const sidebarLinks = [
  { label: 'Overview', path: '/seller', icon: LayoutDashboard },
  { label: 'Products', path: '/seller/products', icon: Package },
  { label: 'Orders', path: '/seller/orders', icon: ShoppingBag },
  { label: 'B2B Deals', path: '/seller/b2b', icon: Briefcase },
  { label: 'Inventory', path: '/seller/inventory', icon: Warehouse },
  { label: 'Pricing AI', path: '/seller/pricing', icon: IndianRupee },
  { label: 'AI Studio', path: '/seller/ai-tools', icon: Sparkles },
  { label: 'Profile', path: '/seller/profile', icon: UserCircle },
];

interface Props {
  children: ReactNode;
}

export function SellerLayout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setSidebarOpen(false), [location.pathname]);

  const isActive = (path: string) =>
    path === '/seller'
      ? location.pathname === '/seller'
      : location.pathname.startsWith(path);

  const sidebar = (
    <nav className="flex flex-col h-full bg-[#FAF7F2] border-r border-stone-200/70">
      {/* Brand & studio header */}
      <div className="px-5 pt-6 pb-4 border-b border-stone-200/60">
        <Link to="/" className="font-serif text-base font-semibold tracking-wider text-stone-900 block">
          SHILPSETU
        </Link>
        <p className="text-[10px] font-sans font-medium tracking-widest uppercase text-[#8C3B1E] mt-0.5">
          Seller Studio
        </p>
      </div>

      {/* Navigation links */}
      <div className="flex-1 px-3 py-4 space-y-1">
        {sidebarLinks.map(({ label, path, icon: Icon }) => {
          const active = isActive(path);
          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                active
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/40'
              }`}
            >
              <Icon size={15} strokeWidth={active ? 2 : 1.75} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>

      {/* Back to marketplace / exit link */}
      <div className="p-3 border-t border-stone-200/60">
        <Link
          to="/profile"
          className="flex items-center gap-2 px-3 py-2 text-xs text-stone-500 hover:text-stone-800 transition-colors"
        >
          <ArrowLeft size={13} />
          <span>Exit to Profile</span>
        </Link>
      </div>
    </nav>
  );

  return (
    <PageLayout noFooter>
      <div className="flex min-h-[calc(100vh-3.5rem)]">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-56 shrink-0">
          {sidebar}
        </aside>

        {/* Mobile overlay sidebar */}
        {sidebarOpen && (
          <>
            <div
              className="lg:hidden fixed inset-0 z-40 bg-stone-900/30 backdrop-blur-xs"
              onClick={() => setSidebarOpen(false)}
            />
            <aside className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-60 shadow-xl animate-fade-in">
              <button
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-200 text-stone-500 z-10"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
              {sidebar}
            </aside>
          </>
        )}

        {/* Main content area */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#FAF7F2] overflow-x-hidden">
          {/* Mobile top bar */}
          <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-stone-200/80 bg-white">
            <button
              className="p-1.5 rounded text-stone-700 hover:text-stone-900"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
            <span className="font-serif text-sm font-semibold text-stone-900">
              Seller Studio
            </span>
          </div>

          {/* Centered content container within remaining viewport */}
          <div className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-10 py-6 sm:py-8 lg:py-10">
            {children}
          </div>
        </main>
      </div>
    </PageLayout>
  );
}
