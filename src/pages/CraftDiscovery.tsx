import { PageLayout } from '@/components/layout/PageLayout';
import { GlassSurface } from '@/components/ui';
import { categories, regions } from '@/data';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/* Mixed grid sizing — alternates large and small cards */
const spanClasses = [
  'md:col-span-2 md:row-span-2',
  '',
  '',
  '',
  'md:col-span-2',
  '',
  'md:col-span-2 md:row-span-2',
  '',
  '',
];

export default function CraftDiscovery() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-ivory py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-[11px] tracking-[0.2em] uppercase text-charcoal/50 mb-4">
            Explore
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight">
            India's Living Crafts
          </h1>
          <p className="font-sans text-charcoal/60 mt-5 text-[15px] leading-relaxed max-w-xl mx-auto">
            Discover craft traditions that have shaped Indian culture for
            centuries—each category a world of skill, story, and artistry.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="bg-linen py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[11px] tracking-[0.2em] uppercase text-charcoal/50 mb-3">
            Categories
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-12 leading-tight">
            Browse by Craft
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <Link
                key={cat.id}
                to={`/marketplace?category=${cat.id}`}
                className={`group relative overflow-hidden rounded-2xl ${spanClasses[i] || ''}`}
              >
                <div className={`relative ${spanClasses[i]?.includes('row-span-2') ? 'h-full min-h-[400px]' : 'aspect-[4/3]'} w-full`}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-warm-black/80 via-warm-black/20 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="font-serif text-xl md:text-2xl text-ivory mb-1">
                      {cat.name}
                    </h3>
                    <p className="font-sans text-xs text-ivory/60 leading-relaxed mb-3">
                      {cat.description}
                    </p>
                    <span className="text-[11px] tracking-[0.2em] uppercase text-ivory/40">
                      {cat.productCount} products
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Regions */}
      <section className="bg-ivory py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[11px] tracking-[0.2em] uppercase text-charcoal/50 mb-3">
            Regions
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4 leading-tight">
            Craft by Geography
          </h2>
          <p className="font-sans text-charcoal/60 text-[15px] leading-relaxed max-w-xl mb-12">
            Every state holds a unique craft vocabulary shaped by its landscape,
            culture, and raw materials.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {regions.map((region) => (
              <Link key={region.id} to={`/marketplace?region=${region.id}`} className="group">
                <GlassSurface variant="light" hover className="overflow-hidden h-full">
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={region.image}
                      alt={region.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-warm-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-5">
                      <h3 className="font-serif text-xl text-ivory">{region.name}</h3>
                      <p className="text-[11px] tracking-[0.2em] uppercase text-ivory/50 mt-0.5">
                        {region.state}
                      </p>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="font-sans text-sm text-charcoal/60 leading-relaxed mb-4">
                      {region.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {region.crafts.map((craft) => (
                        <span
                          key={craft}
                          className="text-[11px] tracking-[0.15em] uppercase px-3 py-1 rounded-full bg-parchment text-charcoal/60"
                        >
                          {craft}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassSurface>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-linen py-20 lg:py-28">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-5 leading-tight">
            Every Craft Tells a Story
          </h2>
          <p className="font-sans text-charcoal/60 text-[15px] leading-relaxed mb-10">
            Step into the marketplace and bring a piece of India's heritage home.
          </p>
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-terracotta text-white text-sm font-medium hover:bg-terracotta-light transition-colors group"
          >
            Visit the Marketplace
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
