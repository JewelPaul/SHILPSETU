import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User as UserIcon, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count: cartCount } = useCart();
  const { count: wishCount } = useWishlist();
  const { isLoggedIn, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-stone-200/70">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Left: Brand logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="font-serif text-base sm:text-lg font-semibold tracking-[0.15em] text-stone-900 hover:opacity-90 transition-opacity uppercase"
            >
              SHILPSETU
            </Link>
          </div>

          {/* Center: Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            <Link
              to="/crafts"
              className={`text-xs font-medium tracking-wider uppercase transition-colors ${
                location.pathname === '/crafts'
                  ? 'text-[#8C3B1E] font-semibold'
                  : 'text-stone-700 hover:text-[#8C3B1E]'
              }`}
            >
              Explore
            </Link>
            <Link
              to="/marketplace"
              className={`text-xs font-medium tracking-wider uppercase transition-colors ${
                location.pathname.startsWith('/marketplace')
                  ? 'text-[#8C3B1E] font-semibold'
                  : 'text-stone-700 hover:text-[#8C3B1E]'
              }`}
            >
              Marketplace
            </Link>
            <Link
              to="/how-it-works"
              className={`text-xs font-medium tracking-wider uppercase transition-colors ${
                location.pathname === '/how-it-works'
                  ? 'text-[#8C3B1E] font-semibold'
                  : 'text-stone-700 hover:text-[#8C3B1E]'
              }`}
            >
              How It Works
            </Link>
            <Link
              to={isLoggedIn && (user?.role === 'artisan' || user?.role === 'both') ? '/seller/orders' : '/seller'}
              className="text-xs font-medium tracking-wider uppercase px-2.5 py-1 rounded-full bg-stone-100 hover:bg-[#8C3B1E]/10 text-stone-800 hover:text-[#8C3B1E] transition-all border border-stone-200/80"
            >
              {isLoggedIn && (user?.role === 'artisan' || user?.role === 'both') ? 'Artisan Studio' : 'Sell on SHILPSETU'}
            </Link>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/search"
              className="p-1.5 text-stone-700 hover:text-stone-950 transition-colors"
              aria-label="Search"
            >
              <Search size={17} strokeWidth={1.75} />
            </Link>

            <Link
              to="/wishlist"
              className="relative p-1.5 text-stone-700 hover:text-stone-950 transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={17} strokeWidth={1.75} />
              {wishCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#8C3B1E] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishCount}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative p-1.5 text-stone-700 hover:text-stone-950 transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag size={17} strokeWidth={1.75} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#8C3B1E] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <span className="h-4 w-px bg-stone-300 mx-1 hidden sm:block" />

            {/* Auth Links */}
            {isLoggedIn ? (
              <Link
                to="/profile"
                className="flex items-center gap-1.5 text-xs text-stone-700 hover:text-stone-950 py-1 px-2 rounded transition-colors"
              >
                <UserIcon size={15} strokeWidth={1.75} />
                <span className="hidden sm:inline font-medium truncate max-w-[90px]">
                  {user?.name?.split(' ')[0] || 'Profile'}
                </span>
              </Link>
            ) : (
              <div className="hidden sm:flex items-center gap-3 text-xs tracking-wide font-medium">
                <Link
                  to="/login"
                  className="text-stone-700 hover:text-[#8C3B1E] transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="text-stone-900 hover:text-[#8C3B1E] border border-stone-300 rounded px-2.5 py-1 transition-colors"
                >
                  Sign up
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-1.5 text-stone-700 hover:text-stone-950"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-t border-stone-200 px-6 py-5 space-y-4 animate-fade-in">
          <div className="flex flex-col space-y-3">
            <Link
              to="/crafts"
              className="text-sm font-medium text-stone-800 hover:text-[#8C3B1E] uppercase tracking-wider py-1 border-b border-stone-200/50"
            >
              Explore
            </Link>
            <Link
              to="/marketplace"
              className="text-sm font-medium text-stone-800 hover:text-[#8C3B1E] uppercase tracking-wider py-1 border-b border-stone-200/50"
            >
              Marketplace
            </Link>
            <Link
              to="/how-it-works"
              className="text-sm font-medium text-stone-800 hover:text-[#8C3B1E] uppercase tracking-wider py-1 border-b border-stone-200/50"
            >
              How It Works
            </Link>
            <Link
              to={isLoggedIn && (user?.role === 'artisan' || user?.role === 'both') ? '/seller/orders' : '/seller'}
              className="text-sm font-medium text-[#8C3B1E] uppercase tracking-wider py-1 border-b border-stone-200/50"
            >
              {isLoggedIn && (user?.role === 'artisan' || user?.role === 'both') ? 'Artisan Studio' : 'Sell on SHILPSETU'}
            </Link>
          </div>

          <div className="pt-2 flex items-center gap-3">
            {isLoggedIn ? (
              <Link
                to="/profile"
                className="flex items-center gap-2 text-sm text-stone-800 font-medium"
              >
                <UserIcon size={16} /> Profile
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex-1 text-center text-xs font-medium py-2 rounded border border-stone-300 text-stone-800"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="flex-1 text-center text-xs font-medium py-2 rounded bg-stone-900 text-white"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
