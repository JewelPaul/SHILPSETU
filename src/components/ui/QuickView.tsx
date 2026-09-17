import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Box, Star } from 'lucide-react';
import { GlassModal } from './GlassModal';
import { ProductImage } from './ProductImage';
import { GlassButton } from './GlassButton';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { artisans } from '@/data';
import type { Product } from '@/data/types';

interface Props {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export function QuickView({ product, open, onClose }: Props) {
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  if (!product) return null;

  const artisan = artisans.find(a => a.id === product.artisanId);
  const wishlisted = has(product.id);

  return (
    <GlassModal open={open} onClose={onClose} size="lg">
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="rounded-xl overflow-hidden aspect-square bg-linen">
          <ProductImage src={product.image} alt={product.name} className="w-full h-full" />
          {product.has3D && (
            <span className="absolute top-3 left-3 glass text-white text-[10px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full flex items-center gap-1">
              <Box size={11} /> 3D
            </span>
          )}
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="font-serif text-xl text-charcoal">{product.name}</h3>
            {artisan && (
              <p className="text-xs text-charcoal/50 mt-1">by {artisan.name} · {artisan.city}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-ochre">
              <Star size={14} fill="currentColor" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-xs text-charcoal/40">({product.reviewCount} reviews)</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-charcoal">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <>
                <span className="text-sm text-charcoal/40 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                <span className="text-xs font-medium text-terracotta">{product.discountPercent}% off</span>
              </>
            )}
          </div>
          <p className="text-sm text-charcoal/60 leading-relaxed">{product.description}</p>
          <div className="text-xs text-charcoal/50 space-y-1">
            <p><span className="font-medium text-charcoal/70">Material:</span> {product.material}</p>
            <p><span className="font-medium text-charcoal/70">Crafting time:</span> {product.craftingTime}</p>
            <p className={product.availability === 'in-stock' ? 'text-forest' : product.availability === 'low-stock' ? 'text-ochre' : 'text-red-500'}>
              {product.availability === 'in-stock' ? 'In Stock' : product.availability === 'low-stock' ? 'Low Stock' : product.availability === 'out-of-stock' ? 'Out of Stock' : 'Made to Order'}
            </p>
          </div>
          <div className="flex gap-2 pt-2">
            <GlassButton variant="primary" size="md" onClick={() => { addItem(product.id); onClose(); }} className="flex-1">
              <ShoppingCart size={15} /> Add to Cart
            </GlassButton>
            <button
              onClick={() => toggle(product.id)}
              className={`p-2.5 rounded-full border transition-all ${wishlisted ? 'bg-terracotta text-white border-terracotta' : 'border-charcoal/15 text-charcoal/50 hover:border-terracotta hover:text-terracotta'}`}
              aria-label="Toggle wishlist"
            >
              <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>
          <Link to={`/marketplace/product/${product.id}`} onClick={onClose} className="block text-center text-xs text-terracotta hover:underline font-medium pt-1">
            View Full Details →
          </Link>
        </div>
      </div>
    </GlassModal>
  );
}
