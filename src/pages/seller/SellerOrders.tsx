import { useState } from 'react';
import { Package, Truck, CheckCircle2, Clock, MapPin, IndianRupee, ArrowUpRight } from 'lucide-react';
import { SellerLayout } from '@/components/layout/SellerLayout';
import { GlassSurface } from '@/components/ui';

interface SellerOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  type: 'Retail' | 'B2B Wholesale';
  productName: string;
  quantity: number;
  totalAmount: number;
  date: string;
  city: string;
  state: string;
  status: 'Received' | 'In-Crafting' | 'Quality Check' | 'Dispatched' | 'Delivered';
}

const INITIAL_ORDERS: SellerOrder[] = [
  {
    id: 'so-1',
    orderNumber: 'SHILP-2026-8941',
    customerName: 'Ananya Deshmukh',
    type: 'Retail',
    productName: 'Hand-Thrown Terracotta Water Carafe',
    quantity: 2,
    totalAmount: 3700,
    date: 'Sep 16, 2026',
    city: 'Pune',
    state: 'Maharashtra',
    status: 'In-Crafting',
  },
  {
    id: 'so-2',
    orderNumber: 'B2B-TCS-0412',
    customerName: 'Tata Consultancy Services',
    type: 'B2B Wholesale',
    productName: 'Handcrafted Terracotta Diya Sets (Bulk)',
    quantity: 100,
    totalAmount: 38000,
    date: 'Sep 15, 2026',
    city: 'Bengaluru',
    state: 'Karnataka',
    status: 'Quality Check',
  },
  {
    id: 'so-3',
    orderNumber: 'SHILP-2026-8812',
    customerName: 'Vikramaditya Roy',
    type: 'Retail',
    productName: 'Dhokra Lost-Wax Bell Metal Nandi Figurine',
    quantity: 1,
    totalAmount: 4200,
    date: 'Sep 14, 2026',
    city: 'Kolkata',
    state: 'West Bengal',
    status: 'Dispatched',
  },
  {
    id: 'so-4',
    orderNumber: 'SHILP-2026-8790',
    customerName: 'Pooja Hegde',
    type: 'Retail',
    productName: 'Handwoven Bamboo Fruit Basket',
    quantity: 1,
    totalAmount: 850,
    date: 'Sep 12, 2026',
    city: 'Hyderabad',
    state: 'Telangana',
    status: 'Delivered',
  },
  {
    id: 'so-5',
    orderNumber: 'SHILP-2026-8995',
    customerName: 'Rajeev Malhotra',
    type: 'Retail',
    productName: 'Terracotta Garden Planter with Motif',
    quantity: 3,
    totalAmount: 3600,
    date: 'Sep 17, 2026',
    city: 'New Delhi',
    state: 'Delhi',
    status: 'Received',
  },
];

const STATUS_ORDER = ['Received', 'In-Crafting', 'Quality Check', 'Dispatched', 'Delivered'] as const;

export default function SellerOrders() {
  const [orders, setOrders] = useState<SellerOrder[]>(INITIAL_ORDERS);
  const [filter, setFilter] = useState<'All' | 'Retail' | 'B2B Wholesale'>('All');

  const advanceStatus = (orderId: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;
        const currentIndex = STATUS_ORDER.indexOf(ord.status);
        if (currentIndex < STATUS_ORDER.length - 1) {
          return { ...ord, status: STATUS_ORDER[currentIndex + 1] };
        }
        return ord;
      })
    );
  };

  const filteredOrders = orders.filter(
    o => filter === 'All' || o.type === filter
  );

  const getStatusColor = (status: SellerOrder['status']) => {
    switch (status) {
      case 'Received': return 'bg-stone-200 text-stone-700';
      case 'In-Crafting': return 'bg-[#8C3B1E]/10 text-[#8C3B1E] border border-[#8C3B1E]/30';
      case 'Quality Check': return 'bg-amber-100 text-amber-800';
      case 'Dispatched': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-[#2E4033]/15 text-[#2E4033]';
    }
  };

  return (
    <SellerLayout>
      <div className="max-w-5xl mx-auto space-y-6 pb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900">
              Order Fulfillment & Craft Pipeline
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 font-sans mt-1">
              Track retail patron orders and institutional B2B consignments
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-stone-200/60 rounded-xl">
            {(['All', 'Retail', 'B2B Wholesale'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium font-sans transition-all ${
                  filter === tab
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Quick summary counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 bg-white/80 border border-stone-200/80 rounded-xl">
            <span className="text-[10px] uppercase font-sans tracking-wider text-stone-400">In Crafting</span>
            <p className="font-serif text-2xl font-bold text-[#8C3B1E] mt-1">
              {orders.filter(o => o.status === 'In-Crafting').length}
            </p>
          </div>
          <div className="p-4 bg-white/80 border border-stone-200/80 rounded-xl">
            <span className="text-[10px] uppercase font-sans tracking-wider text-stone-400">Quality Inspection</span>
            <p className="font-serif text-2xl font-bold text-amber-700 mt-1">
              {orders.filter(o => o.status === 'Quality Check').length}
            </p>
          </div>
          <div className="p-4 bg-white/80 border border-stone-200/80 rounded-xl">
            <span className="text-[10px] uppercase font-sans tracking-wider text-stone-400">In Transit</span>
            <p className="font-serif text-2xl font-bold text-blue-700 mt-1">
              {orders.filter(o => o.status === 'Dispatched').length}
            </p>
          </div>
          <div className="p-4 bg-white/80 border border-stone-200/80 rounded-xl">
            <span className="text-[10px] uppercase font-sans tracking-wider text-stone-400">Total Fulfillable Volume</span>
            <p className="font-serif text-2xl font-bold text-[#2E4033] mt-1">
              ₹{orders.reduce((acc, o) => acc + o.totalAmount, 0).toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        {/* Orders list */}
        <div className="space-y-3">
          {filteredOrders.map((ord) => (
            <GlassSurface
              key={ord.id}
              className="p-5 rounded-xl border border-stone-200/80 bg-white/70 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-stone-900">{ord.orderNumber}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-medium uppercase tracking-wider ${
                    ord.type === 'B2B Wholesale' ? 'bg-[#8C3B1E] text-white' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {ord.type}
                  </span>
                </div>
                <div className="text-xs text-stone-400 font-sans">
                  Received {ord.date}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase text-stone-400 font-sans">Craft Item</span>
                  <h3 className="font-serif text-sm font-semibold text-stone-900">{ord.productName}</h3>
                  <p className="text-xs text-stone-500 font-sans">Qty: {ord.quantity} unit{ord.quantity > 1 ? 's' : ''}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase text-stone-400 font-sans">Patron / Buyer</span>
                  <p className="text-xs font-semibold text-stone-800">{ord.customerName}</p>
                  <div className="flex items-center gap-1 text-xs text-stone-500 font-sans">
                    <MapPin size={11} />
                    <span>{ord.city}, {ord.state}</span>
                  </div>
                </div>

                <div className="space-y-1 sm:text-right">
                  <span className="text-[10px] uppercase text-stone-400 font-sans">Payout Amount</span>
                  <p className="font-serif text-base font-bold text-stone-900">
                    ₹{ord.totalAmount.toLocaleString('en-IN')}
                  </p>
                  <span className="text-[10px] text-[#2E4033] font-medium font-sans">Escrow Protected</span>
                </div>
              </div>

              {/* Status and pipeline controls */}
              <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-500 font-sans">Stage:</span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium font-sans ${getStatusColor(ord.status)}`}>
                    {ord.status}
                  </span>
                </div>

                {ord.status !== 'Delivered' && (
                  <button
                    onClick={() => advanceStatus(ord.id)}
                    className="inline-flex items-center gap-1 text-xs font-sans font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-300 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <span>Mark Next Stage</span>
                    <ArrowUpRight size={13} />
                  </button>
                )}
              </div>
            </GlassSurface>
          ))}
        </div>
      </div>
    </SellerLayout>
  );
}
