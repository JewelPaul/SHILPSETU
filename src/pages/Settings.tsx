import { useState, type ElementType } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { GlassSurface, GlassButton } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';
import { useProducts } from '@/context/ProductContext';
import {
  Bell,
  Globe,
  DollarSign,
  ShieldCheck,
  UserCircle,
  ChevronRight,
  Trash2,
  LogOut,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';

interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}

function Toggle({ checked, onChange, label, description }: ToggleProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-sans font-medium text-charcoal">{label}</p>
        {description && (
          <p className="text-xs font-sans text-charcoal/45 mt-0.5">{description}</p>
        )}
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-5 w-9 flex-shrink-0 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-terracotta/30 ${
          checked ? 'bg-terracotta' : 'bg-charcoal/20'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 mt-0.5 ${
            checked ? 'translate-x-4' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
}

function SectionHeader({
  icon: Icon,
  title,
}: {
  icon: ElementType;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <div className="w-8 h-8 rounded-lg bg-terracotta/10 flex items-center justify-center flex-shrink-0">
        <Icon size={16} className="text-terracotta" />
      </div>
      <h2 className="font-serif text-base font-semibold text-charcoal">{title}</h2>
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-charcoal/8 my-0.5" />;
}

export default function Settings() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Notification toggles
  const [notifOrderUpdates, setNotifOrderUpdates] = useState(true);
  const [notifNewArrivals, setNotifNewArrivals] = useState(true);
  const [notifPromos, setNotifPromos] = useState(false);
  const [notifArtisanUpdates, setNotifArtisanUpdates] = useState(true);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSMS, setNotifSMS] = useState(false);

  // Privacy toggles
  const [privacyWishlistVisible, setPrivacyWishlistVisible] = useState(false);
  const [privacyAnalytics, setPrivacyAnalytics] = useState(true);
  const [privacyPersonalised, setPrivacyPersonalised] = useState(true);

  // Delete confirmation dialog
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { resetDemoData } = useProducts();
  const [resetToast, setResetToast] = useState(false);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <PageLayout>
      <div className="bg-ivory min-h-screen">
        {/* Page header */}
        <div className="bg-parchment border-b border-charcoal/8 py-10 sm:py-12">
          <div className="max-w-2xl mx-auto px-5">
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal">
              Settings
            </h1>
            <p className="text-sm text-charcoal/50 font-sans mt-1">
              Manage your preferences and account
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-5 py-10 sm:py-12 space-y-6">
          {/* Account section */}
          <GlassSurface className="p-5 sm:p-6">
            <SectionHeader icon={UserCircle} title="Account" />
            <div className="space-y-0">
              <div className="flex items-center gap-4 py-3">
                <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center">
                  <span className="font-serif text-sm font-semibold text-terracotta">
                    {user?.name?.[0] ?? 'A'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-sans font-medium text-charcoal">
                    {user?.name ?? 'Guest'}
                  </p>
                  <p className="text-xs font-sans text-charcoal/45">{user?.email ?? '—'}</p>
                </div>
                <ChevronRight size={16} className="text-charcoal/30" />
              </div>
              <Divider />
              <button className="w-full flex items-center justify-between py-3 text-sm font-sans text-charcoal hover:text-terracotta transition-colors group">
                <span>Edit Profile</span>
                <ChevronRight size={16} className="text-charcoal/30 group-hover:text-terracotta transition-colors" />
              </button>
              <Divider />
              <button className="w-full flex items-center justify-between py-3 text-sm font-sans text-charcoal hover:text-terracotta transition-colors group">
                <span>Change Password</span>
                <ChevronRight size={16} className="text-charcoal/30 group-hover:text-terracotta transition-colors" />
              </button>
              <Divider />
              <button className="w-full flex items-center justify-between py-3 text-sm font-sans text-charcoal hover:text-terracotta transition-colors group">
                <span>Manage Addresses</span>
                <ChevronRight size={16} className="text-charcoal/30 group-hover:text-terracotta transition-colors" />
              </button>
            </div>
          </GlassSurface>

          {/* Notifications */}
          <GlassSurface className="p-5 sm:p-6">
            <SectionHeader icon={Bell} title="Notifications" />
            <div className="divide-y divide-charcoal/6">
              <Toggle
                checked={notifOrderUpdates}
                onChange={setNotifOrderUpdates}
                label="Order Updates"
                description="Shipping, delivery, and order status changes"
              />
              <Toggle
                checked={notifNewArrivals}
                onChange={setNotifNewArrivals}
                label="New Arrivals"
                description="New products from artisans you follow"
              />
              <Toggle
                checked={notifArtisanUpdates}
                onChange={setNotifArtisanUpdates}
                label="Artisan Stories"
                description="Updates and news from featured artisans"
              />
              <Toggle
                checked={notifPromos}
                onChange={setNotifPromos}
                label="Promotions & Offers"
                description="Seasonal sales and special discounts"
              />
              <div className="pt-2">
                <p className="text-xs font-sans text-charcoal/45 uppercase tracking-wide mb-1">
                  Channels
                </p>
              </div>
              <Toggle
                checked={notifEmail}
                onChange={setNotifEmail}
                label="Email Notifications"
              />
              <Toggle
                checked={notifSMS}
                onChange={setNotifSMS}
                label="SMS Notifications"
              />
            </div>
          </GlassSurface>

          {/* Language */}
          <GlassSurface className="p-5 sm:p-6">
            <SectionHeader icon={Globe} title="Language" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-sans font-medium text-charcoal">Display Language</p>
                <p className="text-xs font-sans text-charcoal/45 mt-0.5">
                  More languages coming soon
                </p>
              </div>
              <select
                defaultValue="en"
                className="text-sm font-sans px-3 py-2 rounded-lg bg-white/60 border border-charcoal/10 text-charcoal focus:outline-none focus:ring-2 focus:ring-terracotta/30"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="mr">मराठी (Marathi)</option>
                <option value="bn">বাংলা (Bengali)</option>
                <option value="ta">தமிழ் (Tamil)</option>
              </select>
            </div>
          </GlassSurface>

          {/* Currency */}
          <GlassSurface className="p-5 sm:p-6">
            <SectionHeader icon={DollarSign} title="Currency" />
            <div className="flex items-center justify-between py-1">
              <div>
                <p className="text-sm font-sans font-medium text-charcoal">Display Currency</p>
                <p className="text-xs font-sans text-charcoal/45 mt-0.5">
                  All prices are in Indian Rupees
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-parchment border border-charcoal/10">
                <span className="font-sans font-semibold text-charcoal text-sm">₹</span>
                <span className="text-sm font-sans text-charcoal">INR</span>
              </div>
            </div>
            <p className="text-xs font-sans text-charcoal/40 mt-3 pl-0.5">
              Multi-currency support (USD, EUR, GBP) is planned for a future release.
            </p>
          </GlassSurface>

          {/* Privacy */}
          <GlassSurface className="p-5 sm:p-6">
            <SectionHeader icon={ShieldCheck} title="Privacy" />
            <div className="divide-y divide-charcoal/6">
              <Toggle
                checked={privacyWishlistVisible}
                onChange={setPrivacyWishlistVisible}
                label="Public Wishlist"
                description="Allow others to see your saved items"
              />
              <Toggle
                checked={privacyAnalytics}
                onChange={setPrivacyAnalytics}
                label="Usage Analytics"
                description="Help us improve Shilpsetu with anonymous data"
              />
              <Toggle
                checked={privacyPersonalised}
                onChange={setPrivacyPersonalised}
                label="Personalised Recommendations"
                description="Show products based on your browsing history"
              />
            </div>
            <div className="mt-4 pt-2 border-t border-charcoal/6">
              <button className="text-xs font-sans text-charcoal/50 hover:text-terracotta transition-colors underline underline-offset-2">
                Download my data
              </button>
            </div>
          </GlassSurface>

          {/* Demo Reset Card */}
          <GlassSurface className="p-5 sm:p-6 border border-stone-200 bg-[#FAF7F2]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-base font-semibold text-charcoal">Demo System Reset</h2>
                <p className="text-xs font-sans text-charcoal/50 mt-1 max-w-md">
                  Revert all products, newly published artisan crafts, and storage caches to the initial 100 verified Indian craft catalog.
                </p>
              </div>
              <button
                onClick={() => {
                  resetDemoData();
                  setResetToast(true);
                  setTimeout(() => setResetToast(false), 3000);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-stone-300 rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-200/60 transition-colors shrink-0"
              >
                <RefreshCw size={13} />
                <span>Reset Demo Data</span>
              </button>
            </div>

            {resetToast && (
              <div className="mt-3 p-3 bg-[#2E4033]/15 border border-[#2E4033]/30 rounded-xl text-xs text-[#2E4033] font-sans flex items-center gap-2">
                <CheckCircle2 size={14} />
                <span>Demo catalogue and cache successfully restored!</span>
              </div>
            )}
          </GlassSurface>

          {/* Danger zone */}
          <GlassSurface className="p-5 sm:p-6 border border-red-200/60">
            <h2 className="font-serif text-base font-semibold text-charcoal mb-4">Danger Zone</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-sans font-medium text-charcoal">Sign Out</p>
                  <p className="text-xs font-sans text-charcoal/45 mt-0.5">
                    Sign out of your account on this device
                  </p>
                </div>
                <GlassButton
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-charcoal/60 hover:text-charcoal"
                >
                  <LogOut size={14} />
                  Sign out
                </GlassButton>
              </div>
              <Divider />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-sans font-medium text-red-700">Delete Account</p>
                  <p className="text-xs font-sans text-charcoal/45 mt-0.5">
                    Permanently delete your account and all data
                  </p>
                </div>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="flex items-center gap-1.5 text-xs font-sans font-medium px-3 py-1.5 rounded-full border border-red-300 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={13} />
                  Delete
                </button>
              </div>
            </div>
          </GlassSurface>
        </div>
      </div>

      {/* Delete account confirm dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
          <div
            className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"
            onClick={() => setShowDeleteConfirm(false)}
          />
          <GlassSurface className="relative z-10 w-full max-w-sm p-6 bg-ivory shadow-2xl">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={18} className="text-red-600" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-charcoal text-center">
              Delete Account?
            </h3>
            <p className="text-sm font-sans text-charcoal/55 text-center mt-2 leading-relaxed">
              This will permanently delete your account, orders, wishlist, and all associated data.
              This action cannot be undone.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2.5 rounded-full text-sm font-sans font-medium border border-charcoal/15 text-charcoal hover:bg-parchment transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2.5 rounded-full text-sm font-sans font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </GlassSurface>
        </div>
      )}
    </PageLayout>
  );
}
