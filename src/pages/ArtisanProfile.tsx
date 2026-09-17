import { useParams, Link } from 'react-router-dom';
import { MapPin, Award, ArrowLeft } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { ProductCard } from '@/components/ui';
import { artisans, products } from '@/data';

export default function ArtisanProfile() {
  const { id } = useParams<{ id: string }>();
  const artisan = artisans.find(a => a.id === id);

  if (!artisan) {
    return (
      <PageLayout>
        <section className="py-20 lg:py-28 bg-ivory">
          <div className="max-w-3xl mx-auto px-5 text-center">
            <p className="font-serif text-4xl text-charcoal/30 mb-4">Artisan not found</p>
            <p className="text-charcoal/50 mb-8">The artisan you're looking for may have been removed or doesn't exist.</p>
            <Link
              to="/marketplace"
              className="inline-block bg-warm-black text-ivory text-sm font-medium px-8 py-3 rounded-full hover:bg-charcoal transition-colors"
            >
              Back to Marketplace
            </Link>
          </div>
        </section>
      </PageLayout>
    );
  }

  const artisanProducts = products.filter(p => p.artisanId === artisan.id);

  return (
    <PageLayout>
      {/* ─── Hero ─── */}
      <section className="relative min-h-[70vh] flex items-end">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={artisan.portrait}
            alt={artisan.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-warm-black via-warm-black/50 to-transparent" />
        </div>

        {/* Back Link */}
        <Link
          to="/marketplace"
          className="absolute top-6 left-5 z-10 glass text-white text-xs font-medium px-4 py-2 rounded-full flex items-center gap-1.5 hover:bg-white/20 transition-colors"
        >
          <ArrowLeft size={14} />
          Marketplace
        </Link>

        {/* Overlay Content */}
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-5 pb-16 lg:pb-20">
            <div className="glass rounded-2xl p-8 md:p-10 max-w-2xl backdrop-blur-lg border border-white/10">
              <p className="text-[11px] tracking-[0.2em] uppercase text-ivory/50 mb-3">
                {artisan.generation} · {artisan.craft}
              </p>
              <h1 className="font-serif text-4xl md:text-5xl text-ivory leading-tight">
                {artisan.name}
              </h1>
              <div className="flex items-center gap-2 mt-3 text-ivory/60 text-sm">
                <MapPin size={14} />
                {artisan.location}
              </div>
              <p className="mt-5 text-ivory/70 leading-relaxed">{artisan.bio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Quote ─── */}
      <section className="bg-parchment py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <blockquote className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-warm-black leading-relaxed">
            "{artisan.quote}"
          </blockquote>
          <p className="mt-6 text-[11px] tracking-[0.2em] uppercase text-charcoal/40">
            — {artisan.name}
          </p>
        </div>
      </section>

      {/* ─── Story ─── */}
      <section className="bg-ivory py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-5">
          <div className="lg:grid lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-2 mb-8 lg:mb-0">
              <h2 className="text-[11px] tracking-[0.2em] uppercase text-charcoal/50 mb-4">Their Story</h2>
              <h3 className="font-serif text-2xl text-warm-black">
                A life shaped by craft
              </h3>
            </div>
            <div className="lg:col-span-3">
              <p className="text-charcoal/70 leading-[1.85] text-base">
                {artisan.story}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Bio Details ─── */}
      <section className="bg-linen py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Specialties */}
            <div>
              <h3 className="text-[11px] tracking-[0.2em] uppercase text-charcoal/50 mb-5">Specialties</h3>
              <div className="flex flex-wrap gap-2.5">
                {artisan.specialties.map(s => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1.5 text-sm text-charcoal/70 bg-ivory px-4 py-2 rounded-full border border-charcoal/8"
                  >
                    <Award size={13} className="text-terracotta" />
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Details */}
            <div>
              <h3 className="text-[11px] tracking-[0.2em] uppercase text-charcoal/50 mb-5">Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-charcoal/8">
                  <span className="text-sm text-charcoal/50">Location</span>
                  <span className="text-sm font-medium text-charcoal">{artisan.location}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-charcoal/8">
                  <span className="text-sm text-charcoal/50">Craft</span>
                  <span className="text-sm font-medium text-charcoal">{artisan.craft}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-charcoal/8">
                  <span className="text-sm text-charcoal/50">Heritage</span>
                  <span className="text-sm font-medium text-charcoal">{artisan.generation}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-charcoal/8">
                  <span className="text-sm text-charcoal/50">Years of Experience</span>
                  <span className="text-sm font-medium text-charcoal">{artisan.yearsOfExperience} years</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-charcoal/50">Products</span>
                  <span className="text-sm font-medium text-charcoal">{artisanProducts.length} pieces</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Workshop Images ─── */}
      {artisan.workshopImages.length > 0 && (
        <section className="bg-ivory py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-5">
            <h2 className="text-[11px] tracking-[0.2em] uppercase text-charcoal/50 mb-8 text-center">
              The Workshop
            </h2>
            <div className={`grid gap-5 ${artisan.workshopImages.length > 1 ? 'md:grid-cols-2' : 'max-w-3xl mx-auto'}`}>
              {artisan.workshopImages.map((img, i) => (
                <div key={i} className="rounded-2xl overflow-hidden aspect-[3/2]">
                  <img src={img} alt={`${artisan.name}'s workshop`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Shop Their Work ─── */}
      {artisanProducts.length > 0 && (
        <section className="bg-parchment py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-5">
            <div className="text-center mb-12">
              <p className="text-[11px] tracking-[0.2em] uppercase text-charcoal/50 mb-3">From Their Hands</p>
              <h2 className="font-serif text-3xl md:text-4xl text-warm-black">
                Shop {artisan.name.split(' ')[0]}'s Work
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
              {artisanProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
}
