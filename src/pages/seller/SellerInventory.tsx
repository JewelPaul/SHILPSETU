import { useState, useMemo } from 'react';
import { Minus, Plus, Package, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { SellerLayout } from '@/components/layout/SellerLayout';
import { GlassSurface, ProductImage } from '@/components/ui';
import { products } from '@/data';

interface StockItem {
  id: string;
  name: string;
  image: string;
  stock: number;
  availability: 'in-stock' | 'low-stock' | 'out-of-stock' | 'made-to-order';
}

function getStatus(availability: string) {
  switch (availability) {
    case 'made-to-order': return { label: 'Made to Order', cls: 'bg-charcoal/10 text-charcoal/70' };
    case 'out-of-stock': return { label: 'Out of Stock', cls: 'bg-red-100 text-red-700' };
    case 'low-stock': return { label: 'Low Stock', cls: 'bg-ochre/15 text-ochre' };
    default: return { label: 'In Stock', cls: 'bg-forest/10 text-forest' };
  }
}

export default function SellerInventory() {
  const [inventory, setInventory] = useState<StockItem[]>(() =>
    products.slice(0, 12).map(p => ({
      id: p.id,
      name: p.name,
      image: p.image,
      stock: p.stockCount,
      availability: p.availability,
    }))
  );

  const adjust = (id: string, delta: number) => {
    setInventory(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, stock: Math.max(0, item.stock + delta) }
          : item
      )
    );
  };

  const summary = useMemo(() => {
    const total = inventory.length;
    const inStock = inventory.filter(i => i.availability === 'in-stock').length;
    const lowStock = inventory.filter(i => i.availability === 'low-stock').length;
    const outOfStock = inventory.filter(i => i.availability === 'out-of-stock').length;
    return { total, inStock, lowStock, outOfStock };
  }, [inventory]);

  const summaryCards = [
    { label: 'Total Items', value: summary.total, icon: Package, color: 'text-charcoal' },
    { label: 'In Stock', value: summary.inStock, icon: CheckCircle, color: 'text-forest' },
    { label: 'Low Stock', value: summary.lowStock, icon: AlertTriangle, color: 'text-ochre' },
    { label: 'Out of Stock', value: summary.outOfStock, icon: XCircle, color: 'text-red-500' },
  ];

  return (
    <SellerLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal">
            Inventory
          </h1>
          <p className="text-sm text-charcoal/50 mt-1 font-sans">
            Manage stock levels for your products.
          </p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {summaryCards.map(({ label, value, icon: Icon, color }) => (
            <GlassSurface key={label} className="p-4" hover>
              <Icon size={18} className={`${color} mb-1.5 opacity-70`} />
              <p className="text-xl font-semibold font-sans text-charcoal">{value}</p>
              <p className="text-[10px] font-medium tracking-wide uppercase text-charcoal/50 mt-0.5">
                {label}
              </p>
            </GlassSurface>
          ))}
        </div>

        {/* Inventory list */}
        <GlassSurface className="overflow-hidden">
          {/* Desktop header */}
          <div className="hidden sm:grid grid-cols-[1fr_100px_120px_120px] gap-4 px-5 py-3 border-b border-charcoal/8 text-[10px] font-semibold tracking-widest uppercase text-charcoal/40">
            <span>Product</span>
            <span className="text-center">Stock</span>
            <span className="text-center">Status</span>
            <span className="text-center">Adjust</span>
          </div>

          <div className="divide-y divide-charcoal/5">
            {inventory.map(item => {
              const status = getStatus(item.availability);
              return (
                <div
                  key={item.id}
                  className="flex flex-wrap sm:grid sm:grid-cols-[1fr_100px_120px_120px] gap-3 sm:gap-4 items-center px-4 sm:px-5 py-3"
                >
                  {/* Product */}
                  <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
                    <ProductImage
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover shrink-0"
                    />
                    <span className="text-sm font-medium text-charcoal truncate">
                      {item.name}
                    </span>
                  </div>

                  {/* Stock count */}
                  <div className="text-center">
                    <span className="text-sm font-semibold text-charcoal tabular-nums">
                      {item.stock}
                    </span>
                  </div>

                  {/* Status badge */}
                  <div className="text-center">
                    <span
                      className={`inline-block text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full ${status.cls}`}
                    >
                      {status.label}
                    </span>
                  </div>

                  {/* +/- controls */}
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => adjust(item.id, -1)}
                      disabled={item.stock === 0}
                      className="w-8 h-8 rounded-lg bg-charcoal/5 hover:bg-charcoal/10 text-charcoal/60 flex items-center justify-center transition-colors disabled:opacity-30 disabled:pointer-events-none"
                      aria-label={`Decrease stock for ${item.name}`}
                    >
                      <Minus size={14} />
                    </button>
                    <button
                      onClick={() => adjust(item.id, 1)}
                      className="w-8 h-8 rounded-lg bg-charcoal/5 hover:bg-charcoal/10 text-charcoal/60 flex items-center justify-center transition-colors"
                      aria-label={`Increase stock for ${item.name}`}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassSurface>
      </div>
    </SellerLayout>
  );
}
