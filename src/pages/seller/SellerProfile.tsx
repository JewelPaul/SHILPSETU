import { useState } from 'react';
import { UserCircle, Camera, CheckCircle } from 'lucide-react';
import { SellerLayout } from '@/components/layout/SellerLayout';
import { GlassSurface, GlassButton, GlassInput } from '@/components/ui';

const initialProfile = {
  name: 'Meera Prajapati',
  location: 'Sagar, Madhya Pradesh',
  specialty: 'Terracotta & Traditional Pottery',
  bio: 'Fifth-generation potter keeping alive the terracotta traditions of central India. I shape every piece on a hand-powered wheel and fire in a wood kiln to preserve the natural porosity of the clay.',
  phone: '+91 98765 43210',
};

export default function SellerProfile() {
  const [form, setForm] = useState(initialProfile);
  const [saved, setSaved] = useState(false);

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <SellerLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal">
            Seller Profile
          </h1>
          <p className="text-sm text-charcoal/50 mt-1 font-sans">
            How buyers see you on the marketplace.
          </p>
        </div>

        <GlassSurface className="p-5 sm:p-8 space-y-6">
          {/* Profile photo */}
          <div className="flex items-center gap-5">
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-full bg-terracotta/10 flex items-center justify-center">
                <UserCircle size={40} className="text-terracotta/50" />
              </div>
              <button
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white shadow border border-charcoal/10 flex items-center justify-center text-charcoal/50 hover:text-charcoal transition-colors"
                aria-label="Change photo"
              >
                <Camera size={14} />
              </button>
            </div>
            <div>
              <p className="text-sm font-medium text-charcoal">{form.name}</p>
              <p className="text-xs text-charcoal/50">{form.location}</p>
            </div>
          </div>

          <div className="border-t border-charcoal/8" />

          {/* Form fields */}
          <GlassInput label="Full Name" value={form.name} onChange={set('name')} />
          <GlassInput label="Location" value={form.location} onChange={set('location')} placeholder="City, State" />
          <GlassInput label="Craft Specialty" value={form.specialty} onChange={set('specialty')} placeholder="e.g. Terracotta & Traditional Pottery" />

          <div className="space-y-1.5">
            <label className="block text-xs font-medium tracking-wide text-charcoal/70 uppercase">
              Bio
            </label>
            <textarea
              className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-charcoal/10 text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta/40 transition-all text-sm min-h-[120px] resize-y"
              placeholder="Tell buyers about yourself and your craft…"
              value={form.bio}
              onChange={set('bio')}
            />
          </div>

          <GlassInput label="Phone" value={form.phone} onChange={set('phone')} type="tel" placeholder="+91 XXXXX XXXXX" />

          <div className="border-t border-charcoal/8" />

          {/* Save */}
          <div className="flex items-center gap-4">
            <GlassButton variant="primary" onClick={handleSave}>
              Save Profile
            </GlassButton>

            {saved && (
              <span className="flex items-center gap-1.5 text-sm font-medium text-forest animate-fade-in">
                <CheckCircle size={16} />
                Profile saved
              </span>
            )}
          </div>
        </GlassSurface>
      </div>
    </SellerLayout>
  );
}
