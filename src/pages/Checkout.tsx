import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, MapPin, CreditCard, ClipboardList, ChevronRight } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { GlassButton, GlassSurface, ProductImage } from '@/components/ui';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useProducts } from '@/context/ProductContext';
import type { Address } from '@/data/types';

const steps = [
  { id: 1, label: 'Shipping', icon: MapPin },
  { id: 2, label: 'Payment', icon: CreditCard },
  { id: 3, label: 'Review', icon: ClipboardList },
];

export default function Checkout() {
  const { items, clear } = useCart();
  const { user } = useAuth();
  const { products } = useProducts();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(
    user?.addresses.find(a => a.isDefault) ?? user?.addresses[0] ?? null
  );
  const [newAddress, setNewAddress] = useState({ line1: '', city: '', state: '', pincode: '' });
  const [useNew, setUseNew] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const cartProducts = items.map(item => ({
    ...item,
    product: products.find(p => p.id === item.productId),
  })).filter(i => i.product);

  const subtotal = cartProducts.reduce((s, i) => s + i.product!.price * i.quantity, 0);
  const shipping = subtotal >= 2000 ? 0 : 150;
  const total = subtotal + shipping;

  const activeAddress = useNew
    ? { label: 'New', line1: newAddress.line1, city: newAddress.city, state: newAddress.state, pincode: newAddress.pincode }
    : selectedAddress;

  const canProceedShipping = useNew
    ? newAddress.line1 && newAddress.city && newAddress.state && newAddress.pincode
    : !!selectedAddress;

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clear();
  };

  if (orderPlaced) {
    return (
      <PageLayout>
        <section className="py-24 px-6">
          <div className="max-w-md mx-auto text-center space-y-6">
            <CheckCircle size={64} className="mx-auto text-emerald-500" />
            <h1 className="font-serif text-3xl text-charcoal">Order Placed!</h1>
            <p className="font-sans text-charcoal/60">
              Thank you for supporting Indian artisans. Your handcrafted treasures are on their way.
            </p>
            <p className="font-sans text-sm text-charcoal/40">
              A confirmation has been sent to {user?.email ?? 'your email'}.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Link to="/orders">
                <GlassButton variant="secondary">View Orders</GlassButton>
              </Link>
              <Link to="/marketplace">
                <GlassButton variant="primary">Continue Shopping</GlassButton>
              </Link>
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }

  if (cartProducts.length === 0) {
    return (
      <PageLayout>
        <section className="py-24 px-6 text-center space-y-4">
          <p className="font-serif text-xl text-charcoal/60">Your cart is empty</p>
          <Link to="/marketplace">
            <GlassButton variant="primary">Shop Now</GlassButton>
          </Link>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-10">Checkout</h1>

          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center">
                <button
                  onClick={() => s.id < step && setStep(s.id)}
                  disabled={s.id > step}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-sans text-sm transition-all ${
                    s.id === step
                      ? 'bg-terracotta text-white'
                      : s.id < step
                        ? 'bg-terracotta/10 text-terracotta'
                        : 'bg-charcoal/5 text-charcoal/30'
                  }`}
                >
                  <s.icon size={15} />
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {i < steps.length - 1 && <ChevronRight size={16} className="mx-1 text-charcoal/20" />}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-3">

              {/* Step 1: Shipping */}
              {step === 1 && (
                <GlassSurface variant="light" className="p-8 space-y-6">
                  <h2 className="font-serif text-xl text-charcoal">Shipping Address</h2>

                  {user && user.addresses.length > 0 && (
                    <div className="space-y-3">
                      {user.addresses.map(addr => (
                        <button
                          key={addr.id}
                          onClick={() => { setSelectedAddress(addr); setUseNew(false); }}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                            !useNew && selectedAddress?.id === addr.id
                              ? 'border-terracotta bg-terracotta/5'
                              : 'border-charcoal/10 hover:border-charcoal/20'
                          }`}
                        >
                          <p className="font-sans text-sm font-medium text-charcoal">
                            {addr.label}
                            {addr.isDefault && (
                              <span className="ml-2 text-[10px] bg-terracotta/10 text-terracotta px-2 py-0.5 rounded-full uppercase tracking-wider">Default</span>
                            )}
                          </p>
                          <p className="font-sans text-xs text-charcoal/50 mt-1">
                            {addr.line1}, {addr.city}, {addr.state} – {addr.pincode}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => setUseNew(true)}
                    className={`w-full text-left p-4 rounded-xl border-2 border-dashed transition-all ${
                      useNew ? 'border-terracotta bg-terracotta/5' : 'border-charcoal/15 hover:border-charcoal/25'
                    }`}
                  >
                    <p className="font-sans text-sm font-medium text-charcoal">+ Add New Address</p>
                  </button>

                  {useNew && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      {[
                        { key: 'line1' as const, label: 'Address Line', full: true },
                        { key: 'city' as const, label: 'City' },
                        { key: 'state' as const, label: 'State' },
                        { key: 'pincode' as const, label: 'Pincode' },
                      ].map(f => (
                        <div key={f.key} className={f.full ? 'sm:col-span-2' : ''}>
                          <label className="block font-sans text-xs text-charcoal/50 uppercase tracking-wider mb-1.5">{f.label}</label>
                          <input
                            type="text"
                            value={newAddress[f.key]}
                            onChange={e => setNewAddress(prev => ({ ...prev, [f.key]: e.target.value }))}
                            className="w-full px-4 py-2.5 rounded-xl border border-charcoal/15 bg-white/50 font-sans text-sm text-charcoal focus:outline-none focus:border-terracotta transition-colors"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-2">
                    <GlassButton
                      variant="primary"
                      size="lg"
                      className="w-full"
                      disabled={!canProceedShipping}
                      onClick={() => setStep(2)}
                    >
                      Continue to Payment
                    </GlassButton>
                  </div>
                </GlassSurface>
              )}

              {/* Step 2: Payment (Demo) */}
              {step === 2 && (
                <GlassSurface variant="light" className="p-8 space-y-6">
                  <h2 className="font-serif text-xl text-charcoal">Payment Details</h2>
                  <p className="font-sans text-xs text-charcoal/40 uppercase tracking-wider">Demo — no actual charges</p>

                  <div className="space-y-4">
                    <div>
                      <label className="block font-sans text-xs text-charcoal/50 uppercase tracking-wider mb-1.5">Card Number</label>
                      <input
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        className="w-full px-4 py-2.5 rounded-xl border border-charcoal/15 bg-white/50 font-sans text-sm text-charcoal focus:outline-none focus:border-terracotta transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-sans text-xs text-charcoal/50 uppercase tracking-wider mb-1.5">Expiry</label>
                        <input
                          type="text"
                          placeholder="MM / YY"
                          className="w-full px-4 py-2.5 rounded-xl border border-charcoal/15 bg-white/50 font-sans text-sm text-charcoal focus:outline-none focus:border-terracotta transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block font-sans text-xs text-charcoal/50 uppercase tracking-wider mb-1.5">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-2.5 rounded-xl border border-charcoal/15 bg-white/50 font-sans text-sm text-charcoal focus:outline-none focus:border-terracotta transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-sans text-xs text-charcoal/50 uppercase tracking-wider mb-1.5">Name on Card</label>
                      <input
                        type="text"
                        placeholder={user?.name ?? 'Full Name'}
                        className="w-full px-4 py-2.5 rounded-xl border border-charcoal/15 bg-white/50 font-sans text-sm text-charcoal focus:outline-none focus:border-terracotta transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <GlassButton variant="ghost" size="lg" onClick={() => setStep(1)}>Back</GlassButton>
                    <GlassButton variant="primary" size="lg" className="flex-1" onClick={() => setStep(3)}>
                      Review Order
                    </GlassButton>
                  </div>
                </GlassSurface>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <GlassSurface variant="light" className="p-8 space-y-8">
                  <h2 className="font-serif text-xl text-charcoal">Review Your Order</h2>

                  {/* Address */}
                  <div>
                    <p className="font-sans text-xs text-charcoal/50 uppercase tracking-wider mb-2">Shipping to</p>
                    {activeAddress && (
                      <p className="font-sans text-sm text-charcoal">
                        {activeAddress.line1}, {activeAddress.city}, {activeAddress.state} – {activeAddress.pincode}
                      </p>
                    )}
                  </div>

                  {/* Items */}
                  <div>
                    <p className="font-sans text-xs text-charcoal/50 uppercase tracking-wider mb-3">Items</p>
                    <div className="divide-y divide-charcoal/10">
                      {cartProducts.map(({ productId, quantity, product }) => (
                        <div key={productId} className="flex items-center gap-4 py-3">
                          <ProductImage src={product!.image} alt={product!.name} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-sans text-sm font-medium text-charcoal line-clamp-1">{product!.name}</p>
                            <p className="font-sans text-xs text-charcoal/50">Qty: {quantity}</p>
                          </div>
                          <p className="font-sans text-sm font-medium text-charcoal">
                            ₹{(product!.price * quantity).toLocaleString('en-IN')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Totals */}
                  <div className="space-y-2 border-t border-charcoal/10 pt-4">
                    <div className="flex justify-between font-sans text-sm text-charcoal/70">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between font-sans text-sm text-charcoal/70">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                    </div>
                    <div className="flex justify-between font-sans text-base font-semibold text-charcoal pt-2 border-t border-charcoal/10">
                      <span>Total</span>
                      <span>₹{total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <GlassButton variant="ghost" size="lg" onClick={() => setStep(2)}>Back</GlassButton>
                    <GlassButton variant="primary" size="lg" className="flex-1" onClick={handlePlaceOrder}>
                      Place Order — ₹{total.toLocaleString('en-IN')}
                    </GlassButton>
                  </div>
                </GlassSurface>
              )}
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-2 hidden lg:block">
              <GlassSurface variant="light" className="p-6 space-y-4 sticky top-28">
                <h3 className="font-serif text-base text-charcoal">In Your Cart</h3>
                <div className="space-y-3">
                  {cartProducts.map(({ productId, quantity, product }) => (
                    <div key={productId} className="flex items-center gap-3">
                      <ProductImage src={product!.image} alt={product!.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-sans text-xs font-medium text-charcoal line-clamp-1">{product!.name}</p>
                        <p className="font-sans text-[11px] text-charcoal/40">×{quantity}</p>
                      </div>
                      <p className="font-sans text-xs font-medium text-charcoal">
                        ₹{(product!.price * quantity).toLocaleString('en-IN')}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-charcoal/10 pt-3 space-y-1.5">
                  <div className="flex justify-between font-sans text-xs text-charcoal/60">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-sans text-xs text-charcoal/60">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                  </div>
                  <div className="flex justify-between font-sans text-sm font-semibold text-charcoal pt-1.5 border-t border-charcoal/10">
                    <span>Total</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </GlassSurface>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
