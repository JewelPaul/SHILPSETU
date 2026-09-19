import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { Package, Heart, Store, LogOut, ChevronRight, MapPin, RefreshCw, CheckCircle2, Sparkles } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { useAuth } from '@/context/AuthContext';
import { useProducts } from '@/context/ProductContext';

export default function Profile() {
  const { user, isLoggedIn, logout, updateRole } = useAuth();
  const { resetDemoData } = useProducts();
  const [resetNotice, setResetNotice] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleReset = () => {
    resetDemoData();
    setResetNotice(true);
    setTimeout(() => setResetNotice(false), 3000);
  };

  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  const isArtisan = user.role === 'artisan' || user.role === 'seller' || user.role === 'both';

  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        {/* User Identity Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/70">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-stone-200/70 flex items-center justify-center text-stone-600 flex-shrink-0 text-xl font-serif">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                user.name.charAt(0)
              )}
            </div>
            <div className="space-y-0.5">
              <h1 className="font-serif text-2xl text-stone-900">{user.name}</h1>
              <p className="text-xs text-stone-500 font-sans">{user.email}</p>
              <p className="text-xs text-stone-500 font-sans">{user.phone}</p>
            </div>
          </div>

          {/* Role switcher pills */}
          <div className="p-1 bg-stone-100 rounded-xl flex items-center gap-1 self-start sm:self-center">
            {(['buyer', 'artisan', 'both'] as const).map((r) => (
              <button
                key={r}
                onClick={() => updateRole(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium font-sans capitalize transition-all ${
                  user.role === r || (r === 'artisan' && user.role === 'seller')
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {r === 'both' ? 'Dual Role' : r}
              </button>
            ))}
          </div>
        </div>

        {/* Primary Action Banner: Sell on SHILPSETU */}
        {isArtisan ? (
          <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-stone-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-white border border-stone-200 text-[#8C3B1E] mt-0.5">
                <Store size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-base font-semibold text-stone-900">
                    Artisan Studio Dashboard
                  </h3>
                  <span className="px-2 py-0.5 bg-[#2E4033]/15 text-[#2E4033] rounded-full text-[10px] font-medium font-sans">
                    Active Seller
                  </span>
                </div>
                <p className="text-xs text-stone-600 font-sans mt-0.5 max-w-md">
                  Publish new crafts with AI assistance, fulfill institutional bulk orders, and manage your inventory.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/seller/products/new"
                className="inline-flex items-center justify-center text-xs font-medium px-4 py-2 rounded-lg bg-[#8C3B1E] text-white hover:bg-[#722F17] transition-colors"
              >
                + Add Craft
              </Link>
              <Link
                to="/seller"
                className="inline-flex items-center justify-center text-xs font-medium px-4 py-2 rounded-lg bg-stone-900 text-white hover:bg-stone-800 transition-colors"
              >
                Studio
              </Link>
            </div>
          </div>
        ) : (
          <div className="p-5 rounded-2xl bg-stone-100/80 border border-stone-200 flex items-center justify-between">
            <div className="text-xs text-stone-600 font-sans">
              <span className="font-semibold text-stone-900">Are you an artisan or weaver?</span>
              <p>Switch your role to Artisan or Dual Role to start listing handcrafted wares.</p>
            </div>
            <button
              onClick={() => updateRole('artisan')}
              className="text-xs font-semibold px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800"
            >
              Become a Seller
            </button>
          </div>
        )}

        {/* Quick Links */}
        <div className="space-y-3">
          <h2 className="font-serif text-lg text-stone-900">Your Activity</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-sans">
            <Link
              to="/orders"
              className="p-4 rounded-xl border border-stone-200/90 hover:border-stone-400 bg-white flex items-center justify-between transition-colors shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <Package size={18} className="text-stone-700" />
                <div>
                  <p className="font-medium text-stone-900">Orders</p>
                  <p className="text-[11px] text-stone-400">Track current orders</p>
                </div>
              </div>
              <ChevronRight size={14} className="text-stone-400" />
            </Link>

            <Link
              to="/wishlist"
              className="p-4 rounded-xl border border-stone-200/90 hover:border-stone-400 bg-white flex items-center justify-between transition-colors shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <Heart size={18} className="text-[#8C3B1E]" />
                <div>
                  <p className="font-medium text-stone-900">Wishlist</p>
                  <p className="text-[11px] text-stone-400">Saved crafts</p>
                </div>
              </div>
              <ChevronRight size={14} className="text-stone-400" />
            </Link>

            {isArtisan && (
              <Link
                to="/seller/b2b"
                className="p-4 rounded-xl border border-stone-200/90 hover:border-stone-400 bg-white flex items-center justify-between transition-colors shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <Sparkles size={18} className="text-[#E0A96D]" />
                  <div>
                    <p className="font-medium text-stone-900">B2B Tenders</p>
                    <p className="text-[11px] text-stone-400">Corporate inquiries</p>
                  </div>
                </div>
                <ChevronRight size={14} className="text-stone-400" />
              </Link>
            )}
          </div>
        </div>

        {/* Saved Addresses */}
        <div className="space-y-3">
          <h2 className="font-serif text-lg text-stone-900">Saved Addresses</h2>
          <div className="space-y-2">
            {user.addresses.map(addr => (
              <div
                key={addr.id}
                className="p-4 rounded-xl border border-stone-200/80 bg-white flex items-start justify-between text-xs font-sans"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <MapPin size={13} className="text-stone-400" />
                    <span className="font-medium text-stone-900">{addr.label}</span>
                    {addr.isDefault && (
                      <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-sans uppercase">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-stone-600 pl-5">
                    {addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}, {addr.city}, {addr.state} – {addr.pincode}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Demo Data & Controls */}
        <div className="p-4 bg-[#FAF7F2] rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-sans">
          <div>
            <p className="font-semibold text-stone-900">Demo State Reset</p>
            <p className="text-stone-500 text-[11px]">
              Restore catalogue to default 100 authentic products and wipe local modifications.
            </p>
          </div>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-stone-300 rounded-lg text-stone-700 hover:bg-stone-200/60 font-medium transition-colors shrink-0"
          >
            <RefreshCw size={13} />
            <span>Reset Demo Data</span>
          </button>
        </div>

        {resetNotice && (
          <div className="p-3 bg-[#2E4033]/15 border border-[#2E4033]/30 rounded-xl text-xs text-[#2E4033] font-sans flex items-center gap-2">
            <CheckCircle2 size={14} />
            <span>Demo catalogue has been successfully restored to default state!</span>
          </div>
        )}

        {/* Logout & Settings Links */}
        <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs font-sans">
          <Link to="/settings" className="text-stone-500 hover:text-stone-900 underline">
            Account & System Settings
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors"
          >
            <LogOut size={14} /> Log out
          </button>
        </div>
      </div>
    </PageLayout>
  );
}
