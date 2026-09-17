import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { ProductCard } from '@/components/ui';
import { collections, products } from '@/data';

export default function CollectionDetail() {
  const { id } = useParams<{ id: string }>();
  const collection = collections.find(c => c.id === id);

  if (!collection) {
    return (
      <PageLayout>
        <section className="py-20 lg:py-28 bg-ivory">
          <div className="max-w-3xl mx-auto px-5 text-center">
            <p className="font-serif text-4xl text-charcoal/30 mb-4">Collection not found</p>
            <p className="text-charcoal/50 mb-8">The collection you're looking for may have been removed or doesn't exist.</p>
            <Link
              to="/collections"
              className="inline-block bg-warm-black text-ivory text-sm font-medium px-8 py-3 rounded-full hover:bg-charcoal transition-colors"
            >
              View All Collections
            </Link>
          </div>
        </section>
      </PageLayout>
    );
  }

  const collectionProducts = products.filter(p => collection.productIds.includes(p.id));

  return (
    <PageLayout>
      {/* ─── Hero ─── */}
      <section className="relative min-h-[60vh] flex items-end">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={collection.image}
            alt={collection.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-warm-black via-warm-black/40 to-warm-black/10" />
        </div>

        {/* Back Link */}
        <Link
          to="/collections"
          className="absolute top-6 left-5 z-10 glass text-white text-xs font-medium px-4 py-2 rounded-full flex items-center gap-1.5 hover:bg-white/20 transition-colors"
        >
          <ArrowLeft size={14} />
          All Collections
        </Link>

        {/* Hero Content */}
        <div className="relative z-10 w-full pb-16 lg:pb-20">
          <div className="max-w-7xl mx-auto px-5">
            <p className="text-[11px] tracking-[0.2em] uppercase text-ivory/50 mb-4">
              Collection · {collectionProducts.length} {collectionProducts.length === 1 ? 'piece' : 'pieces'}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory leading-tight max-w-3xl">
              {collection.name}
            </h1>
            <p className="mt-3 font-serif italic text-lg text-ivory/60">
              {collection.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Description ─── */}
      <section className="bg-parchment py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <p className="font-serif text-xl md:text-2xl text-warm-black leading-relaxed">
            {collection.description}
          </p>
        </div>
      </section>

      {/* ─── Product Grid ─── */}
      <section className="bg-ivory py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-[11px] tracking-[0.2em] uppercase text-charcoal/50">
              In This Collection
            </h2>
            <p className="text-sm text-charcoal/40">
              {collectionProducts.length} {collectionProducts.length === 1 ? 'piece' : 'pieces'}
            </p>
          </div>

          {collectionProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
              {collectionProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-serif text-2xl text-charcoal/30 mb-2">No products yet</p>
              <p className="text-sm text-charcoal/40">This collection is being curated</p>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
