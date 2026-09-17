import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { GlassButton, ProductCard } from '@/components/ui';
import { useWishlist } from '@/context/WishlistContext';
import { products } from '@/data';

export default function Wishlist() {
  const { ids, count } = useWishlist();
  const wishlisted = products.filter(p => ids.includes(p.id));

  return (
    <PageLayout>
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl text-charcoal">Your Wishlist</h1>
              {count > 0 && (
                <p className="font-sans text-sm text-charcoal/50 mt-2">
                  {count} {count === 1 ? 'item' : 'items'} saved
                </p>
              )}
            </div>
          </div>

          {wishlisted.length === 0 ? (
            <div className="text-center py-24 space-y-4">
              <Heart size={48} className="mx-auto text-charcoal/20" />
              <p className="font-serif text-xl text-charcoal/60">Your wishlist is empty</p>
              <p className="font-sans text-sm text-charcoal/40">Discover handcrafted treasures and save the ones you love.</p>
              <Link to="/marketplace">
                <GlassButton variant="primary" size="lg">Explore Crafts</GlassButton>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlisted.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
