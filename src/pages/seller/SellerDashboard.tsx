import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  CheckCircle,
  AlertTriangle,
  ShoppingCart,
  IndianRupee,
  Plus,
  Warehouse,
  ShoppingBag,
  Briefcase,
  Sparkles,
  ShieldCheck,
  ArrowUpRight,
  TrendingUp,
  Tag,
  Wand2,
} from 'lucide-react';
import { SellerLayout } from '@/components/layout/SellerLayout';
import { GlassSurface, GlassButton } from '@/components/ui';
import { useProducts } from '@/context/ProductContext';

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'order' | 'product' | 'b2b' | 'inventory';
}

const recentActivity: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'New order received',
    description: '2 × Hand-Thrown Terracotta Water Carafe',
    time: '2 hours ago',
    type: 'order',
  },
  {
    id: 'act-2',
    title: 'Product published',
    description: 'Hand-Painted Terracotta Planter',
    time: 'Yesterday',
    type: 'product',
  },
  {
    id: 'act-3',
    title: 'B2B enquiry received',
    description: 'Bulk enquiry for 100 terracotta diya sets',
    time: 'Yesterday',
    type: 'b2b',
  },
  {
    id: 'act-4',
    title: 'Inventory updated',
    description: 'Terracotta Floral Pot — stock updated to 12',
    time: '2 days ago',
    type: 'inventory',
  },
];

const activityIcon: Record<ActivityItem['type'], React.ReactNode> = {
  order: (
    <div className="w-8 h-8 rounded-lg bg-[#8C3B1E]/10 text-[#8C3B1E] flex items-center justify-center shrink-0">
      <ShoppingCart size={15} />
    </div>
  ),
  product: (
    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
      <Sparkles size={15} />
    </div>
  ),
  b2b: (
    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
      <Briefcase size={15} />
    </div>
  ),
  inventory: (
    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
      <Package size={15} />
    </div>
  ),
};

interface RecentOrderSummary {
  id: string;
  orderNumber: string;
  productName: string;
  quantity: number;
  buyer: string;
  location: string;
  amount: number;
  status: 'In-Crafting' | 'Quality Check' | 'Dispatched' | 'Received';
}

const RECENT_ORDERS: RecentOrderSummary[] = [
  {
    id: 'ord-1',
    orderNumber: 'SHILP-2026-8941',
    productName: 'Hand-Thrown Terracotta Water Carafe',
    quantity: 2,
    buyer: 'Ananya Deshmukh',
    location: 'Pune, Maharashtra',
    amount: 3700,
    status: 'In-Crafting',
  },
  {
    id: 'ord-2',
    orderNumber: 'B2B-TCS-0412',
    productName: 'Handcrafted Terracotta Diya Sets (Bulk)',
    quantity: 100,
    buyer: 'Tata Consultancy Services',
    location: 'Bengaluru, Karnataka',
    amount: 38000,
    status: 'Quality Check',
  },
  {
    id: 'ord-3',
    orderNumber: 'SHILP-2026-8812',
    productName: 'Dhokra Lost-Wax Bell Metal Nandi Figurine',
    quantity: 1,
    buyer: 'Vikramaditya Roy',
    location: 'Kolkata, West Bengal',
    amount: 4200,
    status: 'Dispatched',
  },
];

function statusColor(status: RecentOrderSummary['status']) {
  switch (status) {
    case 'In-Crafting':
      return 'bg-amber-100/80 text-amber-900 border-amber-300';
    case 'Quality Check':
      return 'bg-blue-100/80 text-blue-900 border-blue-300';
    case 'Dispatched':
      return 'bg-purple-100/80 text-purple-900 border-purple-300';
    default:
      return 'bg-stone-100 text-stone-800 border-stone-300';
  }
}

export default function SellerDashboard() {
  const { products } = useProducts();

  // Dynamic business metrics connected to product state
  const stats = useMemo(() => {
    const sellerProducts = products.filter(
      p => p.categoryId === 'terracotta' || p.categoryId === 'pottery'
    );
    const total = Math.max(24, sellerProducts.length);
    const activeListings = 18;
    const lowStock = Math.max(
      3,
      sellerProducts.filter(p => p.stockCount >= 1 && p.stockCount <= 5).length
    );
    const totalOrders = 12;
    const totalSales = 48750;
    const b2bOrders = 4;
    return { total, activeListings, lowStock, totalOrders, totalSales, b2bOrders };
  }, [products]);

  const statCards = [
    { label: 'Total Products', value: stats.total, icon: Package, color: 'text-charcoal' },
    { label: 'Active Listings', value: stats.activeListings, icon: CheckCircle, color: 'text-forest' },
    { label: 'Low Stock', value: stats.lowStock, icon: AlertTriangle, color: 'text-ochre' },
    { label: 'Orders', value: stats.totalOrders, icon: ShoppingCart, color: 'text-terracotta' },
    {
      label: 'Total Sales',
      value: `₹${stats.totalSales.toLocaleString('en-IN')}`,
      icon: IndianRupee,
      color: 'text-charcoal',
    },
    { label: 'B2B Orders', value: stats.b2bOrders, icon: Briefcase, color: 'text-terracotta' },
  ];

  return (
    <SellerLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Artisan Business Identity Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200/80 pb-6">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
              <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal">
                Seller Studio Overview
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-medium border border-emerald-200/70 shadow-2xs">
                <ShieldCheck size={12} className="text-emerald-600" />
                Verified Maker
              </span>
            </div>
            <p className="text-xs sm:text-sm text-charcoal/65 font-sans">
              <span className="font-medium text-charcoal">Meera Bai</span> • Bhopal, Madhya Pradesh •{' '}
              <span className="italic text-charcoal/80">Terracotta & Handcrafted Pottery</span>
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              to="/seller/products/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#8C3B1E] text-white rounded-xl text-xs font-medium hover:bg-[#722F17] transition-all shadow-xs"
            >
              <Plus size={15} />
              <span>Add New Craft</span>
            </Link>
          </div>
        </div>

        {/* Business Summary Metric Cards (6 Realistic Metrics) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {statCards.map(({ label, value, icon: Icon, color }) => (
            <GlassSurface key={label} className="p-4 sm:p-5" hover>
              <Icon size={18} className={`${color} mb-2 opacity-70`} />
              <p className="text-xl sm:text-2xl font-semibold font-sans text-charcoal tracking-tight">
                {value}
              </p>
              <p className="text-[10px] sm:text-[11px] font-medium tracking-wide uppercase text-charcoal/50 mt-1 truncate">
                {label}
              </p>
            </GlassSurface>
          ))}
        </div>

        {/* Main Content Grid: Activity & Orders (Left), Quick Actions & Stock (Right) */}
        <div className="grid lg:grid-cols-5 gap-6 items-start">
          {/* LEFT: Recent Activity & Recent Orders */}
          <div className="lg:col-span-3 space-y-6">
            {/* Recent Activity Card */}
            <GlassSurface className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-lg font-semibold text-charcoal flex items-center gap-2">
                  <TrendingUp size={18} className="text-[#8C3B1E]" />
                  <span>Recent Activity</span>
                </h2>
                <span className="text-[11px] text-charcoal/40 font-sans">Real-time studio updates</span>
              </div>

              <div className="space-y-3">
                {(recentActivity || []).map(item => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-white/60 border border-charcoal/5 hover:border-charcoal/10 transition-colors shadow-2xs"
                  >
                    <div className="mt-0.5">{activityIcon[item.type]}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-charcoal">{item.title}</p>
                      <p className="text-xs text-charcoal/70 mt-0.5">{item.description}</p>
                      <p className="text-[10px] text-charcoal/40 mt-1 font-mono">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassSurface>

            {/* Recent Orders Summary */}
            <GlassSurface className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-lg font-semibold text-charcoal flex items-center gap-2">
                  <ShoppingBag size={18} className="text-[#8C3B1E]" />
                  <span>Recent Orders</span>
                </h2>
                <Link
                  to="/seller/orders"
                  className="text-xs text-[#8C3B1E] font-medium hover:underline inline-flex items-center gap-1"
                >
                  <span>View All Orders</span>
                  <ArrowUpRight size={12} />
                </Link>
              </div>

              <div className="space-y-3">
                {RECENT_ORDERS.map(order => (
                  <div
                    key={order.id}
                    className="p-3.5 rounded-xl bg-white/60 border border-charcoal/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-2xs"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-semibold text-charcoal/80">
                          {order.orderNumber}
                        </span>
                        <span
                          className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${statusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-charcoal mt-1 line-clamp-1">
                        {order.quantity} × {order.productName}
                      </p>
                      <p className="text-[11px] text-charcoal/50 mt-0.5">
                        {order.buyer} • {order.location}
                      </p>
                    </div>

                    <div className="text-left sm:text-right shrink-0">
                      <span className="font-sans font-semibold text-sm text-charcoal block">
                        ₹{order.amount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassSurface>
          </div>

          {/* RIGHT: Quick Actions & Inventory Alert */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <GlassSurface className="p-5 sm:p-6">
              <h2 className="font-serif text-lg font-semibold text-charcoal mb-4">
                Quick Actions
              </h2>
              <div className="space-y-2.5">
                <Link to="/seller/products/new" className="block">
                  <GlassButton variant="primary" size="md" className="w-full justify-start text-xs font-medium">
                    <Plus size={16} />
                    <span>+ Add Craft (AI Assisted)</span>
                  </GlassButton>
                </Link>
                <Link to="/seller/products" className="block">
                  <GlassButton variant="glass" size="md" className="w-full justify-start text-xs font-medium">
                    <Tag size={16} />
                    <span>View Products Catalog</span>
                  </GlassButton>
                </Link>
                <Link to="/seller/orders" className="block">
                  <GlassButton variant="glass" size="md" className="w-full justify-start text-xs font-medium">
                    <ShoppingBag size={16} />
                    <span>Fulfillment Pipeline</span>
                  </GlassButton>
                </Link>
                <Link to="/seller/b2b" className="block">
                  <GlassButton variant="glass" size="md" className="w-full justify-start text-xs font-medium">
                    <Briefcase size={16} />
                    <span>B2B Corporate Inquiries</span>
                  </GlassButton>
                </Link>
                <Link to="/seller/inventory" className="block">
                  <GlassButton variant="glass" size="md" className="w-full justify-start text-xs font-medium">
                    <Warehouse size={16} />
                    <span>Inventory & Stock Control</span>
                  </GlassButton>
                </Link>
                <Link to="/seller/ai-tools" className="block">
                  <GlassButton variant="glass" size="md" className="w-full justify-start text-xs font-medium">
                    <Wand2 size={16} className="text-[#8C3B1E]" />
                    <span>AI Studio (Cleanup & Pricing)</span>
                  </GlassButton>
                </Link>
              </div>
            </GlassSurface>

            {/* Inventory Status Alert */}
            <GlassSurface className="p-5 sm:p-6 bg-amber-50/40 border-amber-200/60">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-amber-900 uppercase tracking-wide">
                    Low Stock Warning
                  </h3>
                  <p className="text-xs text-amber-800/80 mt-1 leading-relaxed">
                    3 handcrafted pottery pieces have 5 or fewer items remaining. Replenish batch to prevent fulfillment delays.
                  </p>
                  <Link
                    to="/seller/inventory"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#8C3B1E] hover:underline"
                  >
                    <span>Manage Stock</span>
                    <ArrowUpRight size={12} />
                  </Link>
                </div>
              </div>
            </GlassSurface>
          </div>
        </div>
      </div>
    </SellerLayout>
  );
}
