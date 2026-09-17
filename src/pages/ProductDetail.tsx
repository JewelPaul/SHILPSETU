import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Heart, ChevronRight, Minus, Plus, Star, Check, Briefcase, ShieldCheck, Box } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { ProductCard, ImageZoom } from '@/components/ui';
import { Craft3DViewer } from '@/components/ui/Craft3DViewer';
import { artisans, regions, categories } from '@/data';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useRecentlyViewed } from '@/context/RecentlyViewedContext';
import { useProducts } from '@/context/ProductContext';
import type { ProductVariant } from '@/data/types';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { getProductById, products } = useProducts();
  const product = getProductById(id || '');
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const { addViewed, ids: recentIds } = useRecentlyViewed();
  const [qty, setQty] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [addedNotice, setAddedNotice] = useState(false);
  const [show3D, setShow3D] = useState(searchParams.get('view') === '3d' || window.location.hash === '#3d');

  useEffect(() => {
    if (searchParams.get('view') === '3d' || window.location.hash === '#3d') {
      setShow3D(true);
    }
  }, [searchParams, id]);

  useEffect(() => {
    if (product) addViewed(product.id);
  }, [product?.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <PageLayout>
        <section className="py-24 px-6 text-center max-w-md mx-auto">
          <p className="font-serif text-2xl text-stone-800 mb-2">Object not found</p>
          <p className="text-xs text-stone-500 mb-6">
            The craft piece you are looking for may have been archived or does not exist.
          </p>
          <Link
            to="/marketplace"
            className="inline-block text-xs font-semibold uppercase tracking-wider px-6 py-2.5 rounded-full border border-stone-300 text-stone-900 hover:border-stone-900"
          >
            Return to Marketplace
          </Link>
        </section>
      </PageLayout>
    );
  }

  const artisan = artisans.find(a => a.id === product.artisanId);
  const region = regions.find(r => r.id === product.regionId);
  const category = categories.find(c => c.id === product.categoryId);
  const wishlisted = has(product.id);

  const relatedProducts = products
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const recentProducts = recentIds
    .filter(rid => rid !== product.id)
    .slice(0, 4)
    .map(rid => products.find(p => p.id === rid))
    .filter((p): p is typeof products[number] => Boolean(p));

  const effectivePrice = product.price + (selectedVariant?.priceAdjustment ?? 0);
  const canAddToCart = product.availability !== 'out-of-stock';

  const availabilityText =
    product.availability === 'in-stock'
      ? `In Stock (${product.stockCount} available)`
      : product.availability === 'low-stock'
      ? `Low Stock (${product.stockCount} left)`
      : product.availability === 'made-to-order'
      ? 'Made to Order'
      : 'Out of Stock';

  const handleAddToCart = () => {
    addItem(product.id, qty);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const handleBuyNow = () => {
    addItem(product.id, qty);
    navigate('/cart');
  };

  return (
    <PageLayout>
      {/* Breadcrumbs */}
      <div className="border-b border-stone-200/50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-[11px] text-stone-500 font-sans">
            <Link to="/marketplace" className="hover:text-stone-900 transition-colors">Marketplace</Link>
            <ChevronRight size={11} className="text-stone-400" />
            {category && (
              <>
                <Link to={`/marketplace?category=${category.id}`} className="hover:text-stone-900 transition-colors">
                  {category.name}
                </Link>
                <ChevronRight size={11} className="text-stone-400" />
              </>
            )}
            <span className="text-stone-800 truncate font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Presentation */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16 items-start">
          {/* LEFT: Large Product Image & Gallery with Zoom / 3D */}
          <div className="lg:col-span-7">
            {product.has3D && (
              <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-full w-fit mb-4 border border-stone-200/70">
                <button
                  type="button"
                  onClick={() => setShow3D(false)}
                  className={`py-1.5 px-4 rounded-full text-xs font-medium transition-all ${
                    !show3D ? 'bg-white shadow-xs text-stone-900 font-semibold' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Photos
                </button>
                <button
                  type="button"
                  onClick={() => setShow3D(true)}
                  className={`flex items-center gap-1.5 py-1.5 px-4 rounded-full text-xs font-medium transition-all ${
                    show3D ? 'bg-[#8C3B1E] text-white shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Box size={13} />
                  <span>3D View</span>
                </button>
              </div>
            )}

            {show3D && product.has3D ? (
              <Craft3DViewer
                modelPath={product.model3D}
                poster={product.image}
                materialType={product.material || product.category}
                productName={product.name}
              />
            ) : (
              <ImageZoom images={product.gallery.length > 0 ? product.gallery : [product.image]} alt={product.name} />
            )}
          </div>

          {/* RIGHT: Product Information */}
          <div className="lg:col-span-5 mt-8 lg:mt-0 space-y-6">
            {/* Header info */}
            <div>
              {category && (
                <p className="text-[11px] uppercase tracking-widest text-[#8C3B1E] font-medium font-sans">
                  {category.name}
                </p>
              )}
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-900 tracking-tight leading-snug mt-1">
                {product.name}
              </h1>

              {/* Artisan link */}
              {(artisan || product.artisanName) && (
                <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs text-stone-600">
                  <span>By</span>
                  {artisan ? (
                    <Link
                      to={`/artisan/${artisan.id}`}
                      className="font-medium text-stone-900 hover:text-[#8C3B1E] transition-colors underline underline-offset-2"
                    >
                      {product.artisanName || artisan.name}
                    </Link>
                  ) : (
                    <span className="font-medium text-stone-900">
                      {product.artisanName}
                    </span>
                  )}
                  <span className="text-stone-400">·</span>
                  <span className="text-stone-500">{product.region || `${artisan?.city}, ${artisan?.state}`}</span>
                  {product.isVerified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full ml-1">
                      Verified Maker
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Price & Rating */}
            <div className="flex items-baseline justify-between border-y border-stone-200/70 py-4">
              <div className="flex items-baseline gap-2.5">
                <span className="font-serif text-2xl sm:text-3xl text-stone-900">
                  ₹{effectivePrice.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-xs sm:text-sm text-stone-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.discountPercent && (
                  <span className="text-xs text-[#8C3B1E] font-medium font-sans">
                    ({product.discountPercent}% off)
                  </span>
                )}
              </div>

              {product.rating > 0 && (
                <div className="flex items-center gap-1 text-xs">
                  <Star size={13} className="fill-amber-500 text-amber-500" />
                  <span className="font-semibold text-stone-800">{product.rating}</span>
                  <span className="text-stone-400">({product.reviewCount})</span>
                </div>
              )}
            </div>

            {/* Key Attributes summary */}
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 rounded bg-[#FAF7F2] border border-stone-200/60">
                <p className="text-[10px] text-stone-400 uppercase tracking-wider font-sans">Region</p>
                <p className="font-medium text-stone-800 mt-0.5 truncate">{region?.name || product.state}</p>
              </div>
              <div className="p-2.5 rounded bg-[#FAF7F2] border border-stone-200/60">
                <p className="text-[10px] text-stone-400 uppercase tracking-wider font-sans">Material</p>
                <p className="font-medium text-stone-800 mt-0.5 truncate">{product.material.split(',')[0]}</p>
              </div>
              <div className="p-2.5 rounded bg-[#FAF7F2] border border-stone-200/60">
                <p className="text-[10px] text-stone-400 uppercase tracking-wider font-sans">Status</p>
                <p className="font-medium text-stone-800 mt-0.5 truncate">{availabilityText.split(' ')[0]}</p>
              </div>
            </div>

            {/* Variants if present */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2 pt-1">
                <p className="text-[11px] tracking-wider uppercase text-stone-500 font-sans font-medium">
                  Select Option
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map(v => {
                    const isSelected = selectedVariant?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(isSelected ? null : v)}
                        disabled={!v.inStock}
                        className={`text-xs px-3.5 py-1.5 rounded border transition-all ${
                          isSelected
                            ? 'border-stone-900 bg-stone-900 text-white font-medium'
                            : v.inStock
                            ? 'border-stone-300 text-stone-800 hover:border-stone-700'
                            : 'border-stone-200 text-stone-300 cursor-not-allowed line-through'
                        }`}
                      >
                        {v.label}
                        {v.priceAdjustment ? ` (+₹${v.priceAdjustment})` : ''}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector & Primary Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <span className="text-xs text-stone-500 font-sans">Quantity</span>
                <div className="flex items-center border border-stone-300 rounded-md bg-white">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-2.5 py-1 text-stone-500 hover:text-stone-900"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-7 text-center text-xs font-semibold text-stone-900">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="px-2.5 py-1 text-stone-500 hover:text-stone-900"
                    aria-label="Increase quantity"
                  >
                    <Plus size={12} />
                  </button>
                </div>
                {addedNotice && (
                  <span className="text-xs text-emerald-700 font-medium flex items-center gap-1 animate-fade-in">
                    <Check size={13} /> Added to cart
                  </span>
                )}
              </div>

              {/* Primary Actions: Add to Cart & Buy Now */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={handleAddToCart}
                  disabled={!canAddToCart}
                  className="w-full py-3 px-4 rounded-md border border-stone-800 text-stone-900 hover:bg-stone-100 text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-40"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={!canAddToCart}
                  className="w-full py-3 px-4 rounded-md bg-stone-900 text-white hover:bg-stone-800 text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs disabled:opacity-40"
                >
                  Buy Now
                </button>
              </div>

              {/* Secondary Action: Wishlist */}
              <button
                onClick={() => toggle(product.id)}
                className={`w-full py-2.5 px-4 rounded-md border text-xs font-medium flex items-center justify-center gap-2 transition-colors ${
                  wishlisted
                    ? 'border-[#8C3B1E] text-[#8C3B1E] bg-[#8C3B1E]/5'
                    : 'border-stone-200 text-stone-600 hover:border-stone-400 hover:text-stone-900'
                }`}
              >
                <Heart size={14} fill={wishlisted ? 'currentColor' : 'none'} />
                <span>{wishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}</span>
              </button>

              {/* B2B Procurement Card */}
              {product.b2bAvailable && (
                <div className="p-3.5 bg-[#FAF7F2] border border-stone-200/80 rounded-xl text-xs font-sans space-y-1.5 mt-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-900 flex items-center gap-1.5">
                      <Briefcase size={14} className="text-[#8C3B1E]" />
                      B2B & Corporate Bulk Sourcing
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#8C3B1E]/10 text-[#8C3B1E] font-medium text-[11px]">
                      MOQ: {product.moq || 15} units
                    </span>
                  </div>
                  <p className="text-stone-500 text-[11px] leading-relaxed">
                    Custom co-branding and wholesale volume discounts (up to 35%) available for hotels, corporate gifting, and export consignments.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ─── Below: Description, Craft details, Artisan story, Specifications, Shipping / returns ─── */}
        <div className="mt-20 pt-12 border-t border-stone-200/70 max-w-4xl space-y-16">
          {/* Description */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl text-stone-900">Description</h2>
            <p className="text-sm text-stone-600 leading-relaxed font-sans">
              {product.longDescription || product.description}
            </p>
          </section>

          {/* Craft Details */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl text-stone-900">Craft Technique & Heritage</h2>
            <p className="text-sm text-stone-600 leading-relaxed font-sans">
              Crafted using traditional <span className="text-stone-900 font-medium">{product.craftTechnique}</span> techniques indigenous to {product.city}, {product.state}. Every curve and texture reflects the individual rhythm of the artisan&apos;s hands and hours of dedicated practice.
            </p>
            {product.giStatus && (
              <p className="text-xs text-[#8C3B1E] font-medium">
                Geographical Indication (GI) Status: {product.giStatus}
              </p>
            )}
          </section>

          {/* Artisan Story */}
          {artisan && (
            <section className="space-y-4 p-6 rounded-lg bg-[#FAF7F2] border border-stone-200/60">
              <h2 className="font-serif text-xl text-stone-900">The Maker&apos;s Story</h2>
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <img
                  src={artisan.portrait}
                  alt={artisan.name}
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                />
                <div className="space-y-2">
                  <h3 className="font-serif text-base font-semibold text-stone-900">
                    {artisan.name}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {artisan.craft} Artisan · {artisan.yearsOfExperience}+ years of practice · {artisan.location}
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans pt-1">
                    {artisan.bio || artisan.story}
                  </p>
                  {artisan.quote && (
                    <blockquote className="text-xs italic text-stone-700 border-l-2 border-[#8C3B1E] pl-3 py-0.5 mt-2">
                      &ldquo;{artisan.quote}&rdquo;
                    </blockquote>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Specifications */}
          <section className="space-y-4">
            <h2 className="font-serif text-xl text-stone-900">Specifications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-xs border-t border-stone-200 pt-3">
              <div className="flex justify-between py-1.5 border-b border-stone-200/60">
                <span className="text-stone-500">Material</span>
                <span className="font-medium text-stone-900">{product.material}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-200/60">
                <span className="text-stone-500">Dimensions</span>
                <span className="font-medium text-stone-900">{product.dimensions}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-200/60">
                <span className="text-stone-500">Weight</span>
                <span className="font-medium text-stone-900">{product.weight}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-200/60">
                <span className="text-stone-500">Color</span>
                <span className="font-medium text-stone-900">{product.color}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-200/60">
                <span className="text-stone-500">Crafting Time</span>
                <span className="font-medium text-stone-900">{product.craftingTime}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-200/60">
                <span className="text-stone-500">Care Instructions</span>
                <span className="font-medium text-stone-900 text-right">{product.careInstructions}</span>
              </div>
            </div>
          </section>

          {/* Shipping & Returns */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl text-stone-900">Shipping &amp; Returns</h2>
            <div className="space-y-2 text-xs text-stone-600 font-sans leading-relaxed">
              <p>
                <strong className="text-stone-900">Estimated Delivery:</strong> Shipped directly from artisan clusters in {product.shippingEstimate}. Handcrafted objects take time to pack safely with protective, biodegradable packaging.
              </p>
              <p>
                <strong className="text-stone-900">Return Policy:</strong> {product.returnEligible ? 'Eligible for 7-day hassle-free return in original packaging.' : 'Because this item is hand-loomed or made to order, sales are final unless damaged in transit.'}
              </p>
            </div>
          </section>
        </div>

        {/* Related Crafts */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-stone-200/70">
            <h2 className="font-serif text-xl sm:text-2xl text-stone-900 mb-8">
              Related Pieces in {category?.name || 'Craft'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* Recently Viewed Crafts */}
        {recentProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-stone-200/70">
            <h2 className="font-serif text-xl text-stone-900 mb-8">
              Recently Viewed
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {recentProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
