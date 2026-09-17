import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Archive, Grid3X3, List } from 'lucide-react';
import { SellerLayout } from '@/components/layout/SellerLayout';
import { GlassSurface, GlassButton, ProductImage } from '@/components/ui';
import { useProducts } from '@/context/ProductContext';

function stockBadge(availability: string) {
  switch (availability) {
    case 'made-to-order': return { label: 'Made to Order', cls: 'bg-charcoal/10 text-charcoal/70' };
    case 'out-of-stock': return { label: 'Out of Stock', cls: 'bg-red-100 text-red-700' };
    case 'low-stock': return { label: 'Low Stock', cls: 'bg-ochre/15 text-ochre' };
    default: return { label: 'In Stock', cls: 'bg-forest/10 text-forest' };
  }
}

export default function SellerProducts() {
  const [view, setView] = useState<'list' | 'grid'>('list');
  const { products } = useProducts();
  const sellerProducts = products.slice(0, 12);

  return (
    <SellerLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal">
              Your Products
            </h1>
            <p className="text-sm text-charcoal/50 mt-1 font-sans">
              {sellerProducts.length} crafts listed in your artisan studio
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/seller/products/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#8C3B1E] text-white rounded-xl text-xs font-medium hover:bg-[#722F17] transition-all shadow-xs"
            >
              <Plus size={14} />
              <span>Add New Craft</span>
            </Link>
            <div className="flex items-center gap-1 border border-stone-200 rounded-lg p-0.5">
              <button
                onClick={() => setView('list')}
                className={`p-1.5 rounded-md transition-colors ${view === 'list' ? 'bg-stone-900 text-white' : 'text-charcoal/40 hover:text-charcoal/60'}`}
                aria-label="List view"
              >
                <List size={16} />
              </button>
              <button
                onClick={() => setView('grid')}
                className={`p-1.5 rounded-md transition-colors ${view === 'grid' ? 'bg-stone-900 text-white' : 'text-charcoal/40 hover:text-charcoal/60'}`}
                aria-label="Grid view"
              >
                <Grid3X3 size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Product list */}
        {view === 'list' ? (
          <div className="space-y-3">
            {sellerProducts.map(product => {
              const badge = stockBadge(product.availability);
              return (
                <GlassSurface
                  key={product.id}
                  className="flex items-center gap-4 p-3 sm:p-4"
                  hover
                >
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-charcoal truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-charcoal/50 mt-0.5">
                      ₹{product.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-4 shrink-0">
                    <span className="text-xs text-charcoal/50 w-16 text-right">
                      Stock: {product.stockCount}
                    </span>
                    <span
                      className={`text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full ${badge.cls}`}
                    >
                      {badge.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      className="p-2 rounded-lg text-charcoal/40 hover:text-charcoal hover:bg-charcoal/5 transition-colors"
                      aria-label="Edit"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      className="p-2 rounded-lg text-charcoal/40 hover:text-charcoal hover:bg-charcoal/5 transition-colors"
                      aria-label="Archive"
                    >
                      <Archive size={15} />
                    </button>
                  </div>
                </GlassSurface>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {sellerProducts.map(product => {
              const badge = stockBadge(product.availability);
              return (
                <GlassSurface key={product.id} className="overflow-hidden" hover>
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="p-3">
                    <p className="text-sm font-medium text-charcoal truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-charcoal/50 mt-0.5">
                      ₹{product.price.toLocaleString('en-IN')} · Stock: {product.stockCount}
                    </p>
                    <span
                      className={`inline-block text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full mt-2 ${badge.cls}`}
                    >
                      {badge.label}
                    </span>
                    <div className="flex items-center gap-1 mt-2">
                      <button
                        className="p-1.5 rounded-lg text-charcoal/40 hover:text-charcoal hover:bg-charcoal/5 transition-colors"
                        aria-label="Edit"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        className="p-1.5 rounded-lg text-charcoal/40 hover:text-charcoal hover:bg-charcoal/5 transition-colors"
                        aria-label="Archive"
                      >
                        <Archive size={14} />
                      </button>
                    </div>
                  </div>
                </GlassSurface>
              );
            })}
          </div>
        )}

        {/* Floating add button */}
        <div className="fixed bottom-20 lg:bottom-8 right-6 z-30">
          <Link to="/seller/products/new">
            <GlassButton variant="primary" size="lg" className="shadow-lg">
              <Plus size={20} />
              Add Product
            </GlassButton>
          </Link>
        </div>
      </div>
    </SellerLayout>
  );
}
