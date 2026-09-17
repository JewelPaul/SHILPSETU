import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { GlassSurface, GlassButton, ProductImage } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';
import { sampleOrders, products } from '@/data';

const statusStyles: Record<string, string> = {
  processing: 'bg-amber-100 text-amber-800',
  shipped: 'bg-emerald-100 text-emerald-800',
  delivered: 'bg-terracotta/10 text-terracotta',
};

const statusLabels: Record<string, string> = {
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
};

export default function Orders() {
  const { isLoggedIn } = useAuth();
  const orders = isLoggedIn ? sampleOrders : [];

  return (
    <PageLayout>
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-10">Your Orders</h1>

          {orders.length === 0 ? (
            <div className="text-center py-24 space-y-4">
              <Package size={48} className="mx-auto text-charcoal/20" />
              <p className="font-sans text-charcoal/50">No orders yet.</p>
              <Link to="/marketplace">
                <GlassButton variant="primary">Explore Marketplace</GlassButton>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map(order => {
                const orderProducts = order.items.map(item => ({
                  ...item,
                  product: products.find(p => p.id === item.productId),
                }));

                return (
                  <GlassSurface key={order.id} variant="light" className="p-6 md:p-8">
                    {/* Order Header */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                      <div className="space-y-1">
                        <p className="font-sans text-xs text-charcoal/50 uppercase tracking-wider">Order</p>
                        <p className="font-sans text-sm font-medium text-charcoal">{order.id}</p>
                      </div>
                      <div className="space-y-1 text-right sm:text-left">
                        <p className="font-sans text-xs text-charcoal/50 uppercase tracking-wider">Placed on</p>
                        <p className="font-sans text-sm text-charcoal">
                          {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-sans font-medium uppercase tracking-wider ${statusStyles[order.status]}`}>
                        {statusLabels[order.status]}
                      </span>
                    </div>

                    {/* Items */}
                    <div className="divide-y divide-charcoal/10">
                      {orderProducts.map(({ product, productId, quantity }) => (
                        <div key={productId} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                          {product ? (
                            <>
                              <Link to={`/marketplace/product/${product.id}`} className="flex-shrink-0">
                                <ProductImage src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                              </Link>
                              <div className="flex-1 min-w-0">
                                <Link to={`/marketplace/product/${product.id}`} className="font-sans text-sm font-medium text-charcoal hover:text-terracotta transition-colors line-clamp-1">
                                  {product.name}
                                </Link>
                                <p className="font-sans text-xs text-charcoal/50 mt-0.5">Qty: {quantity}</p>
                              </div>
                              <p className="font-sans text-sm font-medium text-charcoal flex-shrink-0">
                                ₹{(product.price * quantity).toLocaleString('en-IN')}
                              </p>
                            </>
                          ) : (
                            <p className="font-sans text-sm text-charcoal/40">Product unavailable</p>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-6 pt-4 border-t border-charcoal/10 flex items-center justify-between">
                      <p className="font-sans text-xs text-charcoal/50">{order.address}</p>
                      <p className="font-sans text-base font-semibold text-charcoal">
                        ₹{order.total.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </GlassSurface>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
