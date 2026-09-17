import { Link } from 'react-router-dom';
import { ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { GlassButton, GlassSurface, ProductImage } from '@/components/ui';
import { useCart } from '@/context/CartContext';
import { useProducts } from '@/context/ProductContext';
import { artisans } from '@/data';

export default function Cart() {
  const { items, updateQty, removeItem } = useCart();
  const { products } = useProducts();

  const cartProducts = items.map(item => {
    const product = products.find(p => p.id === item.productId);
    const artisan = product ? artisans.find(a => a.id === product.artisanId) : undefined;
    return { ...item, product, artisan };
  }).filter(i => i.product);

  const subtotal = cartProducts.reduce(
    (sum, i) => sum + (i.product!.price * i.quantity), 0
  );
  const shipping = subtotal >= 2000 ? 0 : 150;
  const total = subtotal + shipping;

  return (
    <PageLayout>
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-10">Your Cart</h1>

          {cartProducts.length === 0 ? (
            <div className="text-center py-24 space-y-4">
              <ShoppingBag size={48} className="mx-auto text-charcoal/20" />
              <p className="font-serif text-xl text-charcoal/60">Your cart is empty</p>
              <p className="font-sans text-sm text-charcoal/40">Add beautiful handcrafted pieces to get started.</p>
              <Link to="/marketplace">
                <GlassButton variant="primary" size="lg">Shop Now</GlassButton>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartProducts.map(({ productId, quantity, product, artisan }) => (
                  <GlassSurface key={productId} variant="light" className="p-5 flex gap-5">
                    <Link to={`/marketplace/product/${product!.id}`} className="flex-shrink-0">
                      <ProductImage
                        src={product!.image}
                        alt={product!.name}
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover"
                      />
                    </Link>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <Link to={`/marketplace/product/${product!.id}`} className="font-sans text-sm font-medium text-charcoal hover:text-terracotta transition-colors line-clamp-1">
                          {product!.name}
                        </Link>
                        {artisan && (
                          <p className="font-sans text-xs text-charcoal/50 mt-0.5">by {artisan.name}</p>
                        )}
                        <p className="font-sans text-sm font-semibold text-charcoal mt-2">
                          ₹{product!.price.toLocaleString('en-IN')}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-charcoal/15 rounded-full overflow-hidden">
                          <button
                            onClick={() => updateQty(productId, quantity - 1)}
                            disabled={quantity <= 1}
                            className="px-3 py-1.5 text-charcoal/60 hover:bg-charcoal/5 transition-colors disabled:opacity-30"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 font-sans text-sm font-medium text-charcoal min-w-[2rem] text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQty(productId, quantity + 1)}
                            className="px-3 py-1.5 text-charcoal/60 hover:bg-charcoal/5 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(productId)}
                          className="p-2 text-charcoal/30 hover:text-terracotta transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </GlassSurface>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <GlassSurface variant="light" className="p-8 space-y-6 sticky top-28">
                  <h2 className="font-serif text-lg text-charcoal">Order Summary</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between font-sans text-sm text-charcoal/70">
                      <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                      <span>₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between font-sans text-sm text-charcoal/70">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? <span className="text-emerald-600">Free</span> : `₹${shipping}`}</span>
                    </div>
                    {shipping > 0 && (
                      <p className="font-sans text-[11px] text-charcoal/40">
                        Free shipping on orders above ₹2,000
                      </p>
                    )}
                  </div>
                  <div className="border-t border-charcoal/10 pt-4 flex justify-between">
                    <span className="font-sans text-base font-semibold text-charcoal">Total</span>
                    <span className="font-sans text-base font-semibold text-charcoal">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                  <Link to="/checkout" className="block">
                    <GlassButton variant="primary" size="lg" className="w-full">
                      Proceed to Checkout
                    </GlassButton>
                  </Link>
                </GlassSurface>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
