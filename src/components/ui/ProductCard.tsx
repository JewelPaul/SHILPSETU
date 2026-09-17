import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Star, Box } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { artisans } from '@/data';
import type { Product } from '@/data/types';
import { ProductImage } from './ProductImage';

interface Props {
  product: Product;
  onQuickView?: (product: Product) => void;
  aspectRatio?: string; // allow custom aspect ratio for masonry layouts
}

export function ProductCard({ product, aspectRatio = 'aspect-[4/5]' }: Props) {
  const navigate = useNavigate();
  const { toggle, has } = useWishlist();
  const artisan = artisans.find(a => a.id === product.artisanId);
  const wishlisted = has(product.id);
  const [hovered, setHovered] = useState(false);

  // Genuinely different secondary image only
  const hasSecondary = Boolean(product.hoverImage && product.hoverImage !== product.image);

  return (
    <div
      className="group flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        to={`/marketplace/product/${product.id}`}
        className={`block relative overflow-hidden rounded-md bg-[#FAF7F2] ${aspectRatio}`}
      >
        {/* Primary Image */}
        <ProductImage
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] ${
            hasSecondary && hovered ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Secondary Detail Image (Only when genuinely different) */}
        {hasSecondary && (
          <ProductImage
            src={product.hoverImage!}
            alt={`${product.name} detail view`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.02] ${
              hovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          />
        )}

        {/* 3D Badge (Only for products where has3D is true) */}
        {product.has3D && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate(`/marketplace/product/${product.id}?view=3d`);
            }}
            className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-stone-900/85 hover:bg-stone-900 backdrop-blur-md text-white text-[10px] font-medium tracking-wide flex items-center gap-1 shadow-xs z-10 transition-colors cursor-pointer"
            title="Open in interactive 3D viewer"
          >
            <Box size={10} className="text-[#E8A87C]" />
            <span>3D</span>
          </button>
        )}

        {/* Wishlist Button - minimal & refined */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggle(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-1.5 rounded-full transition-all duration-200 ${
            wishlisted
              ? 'bg-[#8C3B1E] text-white shadow-sm'
              : 'bg-white/80 backdrop-blur-sm text-stone-600 hover:text-[#8C3B1E] hover:bg-white opacity-85 hover:opacity-100'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={14} fill={wishlisted ? 'currentColor' : 'none'} strokeWidth={1.75} />
        </button>
      </Link>

      {/* Card Information Below Image */}
      <div className="mt-2.5 flex flex-col gap-0.5">
        <Link to={`/marketplace/product/${product.id}`} className="hover:text-[#8C3B1E] transition-colors">
          <h3 className="font-sans text-[13px] font-medium text-stone-900 leading-snug line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between text-[11px] text-stone-500 font-sans">
          <span className="truncate hover:text-stone-800 transition-colors">
            {product.artisanName || artisan?.name}
          </span>
          {(product.city || product.state) && (
            <span className="text-[10px] text-stone-400 truncate shrink-0 ml-1.5">
              {product.city || product.state}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-1 pt-0.5">
          <div className="flex items-baseline gap-1.5">
            <span className="font-sans text-[13px] font-semibold text-stone-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] text-stone-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {product.rating > 0 && (
            <div className="flex items-center gap-0.5 text-stone-600">
              <Star size={11} className="fill-amber-500 text-amber-500" />
              <span className="text-[11px] font-medium text-stone-600">{product.rating}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
