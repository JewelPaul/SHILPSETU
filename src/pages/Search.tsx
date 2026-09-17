import { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search as SearchIcon, MapPin, Scissors, X, Clock } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { GlassSurface, ProductCard } from '@/components/ui';
import { products, artisans } from '@/data';
import type { Product, Artisan } from '@/data';

const SUGGESTED_SEARCHES = [
  'Terracotta',
  'Blue Pottery',
  'Silk',
  'Madhya Pradesh',
  'Wooden Bowl',
];

export default function Search() {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const trimmed = query.trim().toLowerCase();

  const filteredProducts = useMemo<Product[]>(() => {
    if (!trimmed) return [];
    return products.filter((p) => {
      const artisan = artisans.find((a) => a.id === p.artisanId);
      const artisanName = artisan?.name.toLowerCase() ?? '';
      return (
        p.name.toLowerCase().includes(trimmed) ||
        p.material.toLowerCase().includes(trimmed) ||
        p.categoryId.toLowerCase().includes(trimmed) ||
        p.regionId.toLowerCase().replace(/-/g, ' ').includes(trimmed) ||
        artisanName.includes(trimmed) ||
        p.tags.some((t) => t.toLowerCase().includes(trimmed)) ||
        p.description.toLowerCase().includes(trimmed)
      );
    });
  }, [trimmed]);

  const filteredArtisans = useMemo<Artisan[]>(() => {
    if (!trimmed) return [];
    return artisans.filter((a) =>
      a.name.toLowerCase().includes(trimmed) ||
      a.craft.toLowerCase().includes(trimmed) ||
      a.location.toLowerCase().includes(trimmed) ||
      a.regionId.toLowerCase().replace(/-/g, ' ').includes(trimmed) ||
      a.specialties.some((s) => s.toLowerCase().includes(trimmed))
    );
  }, [trimmed]);

  const hasResults = filteredProducts.length > 0 || filteredArtisans.length > 0;
  const noResults = trimmed && !hasResults;

  return (
    <PageLayout>
      {/* Hero search bar */}
      <section className="bg-parchment border-b border-charcoal/8 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-5">
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal text-center mb-8">
            Discover Indian Craft
          </h1>
          <div className="relative">
            <SearchIcon
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40 pointer-events-none"
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search crafts, artisans, materials, regions…"
              className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-charcoal/10 text-charcoal placeholder:text-charcoal/35 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta/40 text-base font-sans shadow-sm"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal transition-colors"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Suggested searches — shown when input is empty */}
          {!trimmed && (
            <div className="mt-5 flex flex-wrap gap-2 justify-center">
              <span className="text-xs text-charcoal/45 font-sans flex items-center gap-1 mr-1">
                <Clock size={12} /> Try:
              </span>
              {SUGGESTED_SEARCHES.map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="text-xs font-sans px-3 py-1.5 rounded-full glass text-charcoal/70 hover:text-charcoal hover:bg-white/40 transition-colors border border-charcoal/10"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="bg-ivory min-h-[60vh] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-5">
          {/* Empty state */}
          {!trimmed && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-parchment flex items-center justify-center mb-4">
                <SearchIcon size={28} className="text-charcoal/30" />
              </div>
              <p className="font-serif text-xl text-charcoal/50">
                Search for crafts, artisans, materials or regions
              </p>
              <p className="text-sm text-charcoal/35 font-sans mt-2">
                Explore thousands of handcrafted pieces from across India
              </p>
            </div>
          )}

          {/* No results */}
          {noResults && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-parchment flex items-center justify-center mb-4">
                <SearchIcon size={28} className="text-charcoal/30" />
              </div>
              <p className="font-serif text-xl text-charcoal/60">
                No results found for &ldquo;{query.trim()}&rdquo;
              </p>
              <p className="text-sm text-charcoal/40 font-sans mt-2">
                Try a different term, or browse our collections
              </p>
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                {SUGGESTED_SEARCHES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="text-xs font-sans px-3 py-1.5 rounded-full glass text-charcoal/70 hover:text-charcoal transition-colors border border-charcoal/10"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Product results */}
          {filteredProducts.length > 0 && (
            <div className="mb-12">
              <div className="flex items-baseline gap-3 mb-5">
                <h2 className="font-serif text-xl font-semibold text-charcoal">Products</h2>
                <span className="text-sm text-charcoal/45 font-sans">
                  {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}

          {/* Artisan results */}
          {filteredArtisans.length > 0 && (
            <div>
              <div className="flex items-baseline gap-3 mb-5">
                <h2 className="font-serif text-xl font-semibold text-charcoal">Artisans</h2>
                <span className="text-sm text-charcoal/45 font-sans">
                  {filteredArtisans.length} result{filteredArtisans.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredArtisans.map((artisan) => (
                  <Link key={artisan.id} to={`/artisan/${artisan.id}`}>
                    <GlassSurface hover className="p-4 flex items-center gap-4">
                      {/* Portrait */}
                      <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-parchment">
                        <img
                          src={artisan.portrait}
                          alt={artisan.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <h3 className="font-serif text-base font-semibold text-charcoal truncate">
                          {artisan.name}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <Scissors size={11} className="text-terracotta flex-shrink-0" />
                          <span className="text-xs font-sans text-charcoal/60 truncate">
                            {artisan.craft}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <MapPin size={11} className="text-charcoal/40 flex-shrink-0" />
                          <span className="text-xs font-sans text-charcoal/45 truncate">
                            {artisan.location}
                          </span>
                        </div>
                      </div>
                      {/* Arrow hint */}
                      <span className="text-charcoal/25 text-lg flex-shrink-0">›</span>
                    </GlassSurface>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
