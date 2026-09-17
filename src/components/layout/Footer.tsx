import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-[#FAF7F2] border-t border-stone-200/80 text-stone-600 mt-auto">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-stone-200/70">
          {/* Brand Col */}
          <div className="col-span-2 space-y-3">
            <Link to="/" className="inline-block">
              <span className="font-serif text-lg font-bold tracking-[0.16em] text-stone-900 uppercase">
                SHILPSETU
              </span>
            </Link>
            <p className="text-xs font-serif italic text-[#8C3B1E]">
              “Crafting Livelihoods, Connecting Worlds”
            </p>
            <p className="text-xs text-stone-500 font-sans max-w-sm leading-relaxed pt-1">
              An AI-powered digital commerce ecosystem connecting India&apos;s master artisans with conscious patrons, architects, and global B2B procurement partners.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-stone-500">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-600" />
              <span>100% Direct-from-Artisan Authenticity</span>
            </div>
          </div>

          {/* Col 1: Discover */}
          <div className="space-y-3">
            <p className="text-[11px] font-semibold tracking-wider text-stone-900 uppercase font-sans">
              Discover Crafts
            </p>
            <ul className="space-y-2 text-xs text-stone-600">
              <li><Link to="/marketplace" className="hover:text-stone-950 transition-colors">All Crafts</Link></li>
              <li><Link to="/marketplace?category=terracotta" className="hover:text-stone-950 transition-colors">Terracotta</Link></li>
              <li><Link to="/marketplace?category=pottery" className="hover:text-stone-950 transition-colors">Pottery & Ceramics</Link></li>
              <li><Link to="/marketplace?category=handloom" className="hover:text-stone-950 transition-colors">Handloom Sarees</Link></li>
              <li><Link to="/marketplace?category=woodcraft" className="hover:text-stone-950 transition-colors">Woodcraft</Link></li>
              <li><Link to="/marketplace?category=metalcraft" className="hover:text-stone-950 transition-colors">Metalcraft & Brass</Link></li>
              <li><Link to="/marketplace?category=bamboo" className="hover:text-stone-950 transition-colors">Bamboo Craft</Link></li>
            </ul>
          </div>

          {/* Col 2: For Artisans & B2B */}
          <div className="space-y-3">
            <p className="text-[11px] font-semibold tracking-wider text-stone-900 uppercase font-sans">
              Artisan & B2B
            </p>
            <ul className="space-y-2 text-xs text-stone-600">
              <li><Link to="/seller" className="hover:text-stone-950 transition-colors">Sell on SHILPSETU</Link></li>
              <li><Link to="/seller/add-product" className="hover:text-stone-950 transition-colors">AI Listing Studio</Link></li>
              <li><Link to="/seller/b2b" className="hover:text-stone-950 transition-colors">B2B Tenders</Link></li>
              <li><Link to="/how-it-works" className="hover:text-stone-950 transition-colors">How It Works</Link></li>
              <li><Link to="/seller/orders" className="hover:text-stone-950 transition-colors">Artisan Studio</Link></li>
            </ul>
          </div>

          {/* Col 3: Trust & Legal */}
          <div className="space-y-3">
            <p className="text-[11px] font-semibold tracking-wider text-stone-900 uppercase font-sans">
              Trust & Support
            </p>
            <ul className="space-y-2 text-xs text-stone-600">
              <li><Link to="/crafts" className="hover:text-stone-950 transition-colors">Craft Clusters</Link></li>
              <li><Link to="/orders" className="hover:text-stone-950 transition-colors">Track Orders</Link></li>
              <li><Link to="/account" className="hover:text-stone-950 transition-colors">My Account</Link></li>
              <li><Link to="/settings" className="hover:text-stone-950 transition-colors">Demo Settings</Link></li>
              <li><span className="text-stone-400 cursor-default">Direct UPI Payouts</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
          <p>© {new Date().getFullYear()} SHILPSETU. Dedicated to the master artisans of India. Handcrafted in India.</p>
          <p className="tracking-wider uppercase font-medium text-stone-400">
            Terracotta · Handloom · Dhokra · Wood · Bamboo
          </p>
        </div>
      </div>
    </footer>
  );
}
