import type { Order } from './types';

export const sampleOrders: Order[] = [
  // ── Order 1: Delivered ──────────────────────────────────────────────────
  {
    id: 'ORD-2024-001',
    date: '2024-08-10',
    status: 'delivered',
    items: [
      { productId: 'tc-1', quantity: 1 },
      { productId: 'tc-3', quantity: 2 },
    ],
    total: 2750,
    address: '42 Lakeview Lane, Bhopal, MP 462001',
    paymentMethod: 'UPI — Google Pay',
    timeline: [
      { status: 'Order Placed', date: '2024-08-10', description: 'Your order has been placed successfully' },
      { status: 'Confirmed', date: '2024-08-11', description: 'Order confirmed by artisan Ramesh Kumar' },
      { status: 'Crafting', date: '2024-08-12', description: 'Artisan has begun crafting your piece' },
      { status: 'Packed', date: '2024-08-18', description: 'Your order has been carefully packed with eco-friendly materials' },
      { status: 'Shipped', date: '2024-08-19', description: 'Shipped via India Post (Tracking: EP123456789IN)' },
      { status: 'Delivered', date: '2024-08-24', description: 'Delivered to your address in Bhopal' },
    ],
  },

  // ── Order 2: Shipped ────────────────────────────────────────────────────
  {
    id: 'ORD-2024-002',
    date: '2024-09-02',
    status: 'shipped',
    items: [
      { productId: 'dk-1', quantity: 1 },
      { productId: 'sc-1', quantity: 1 },
    ],
    total: 8400,
    address: '18/3 MG Road, Bengaluru, KA 560001',
    paymentMethod: 'Credit Card — ending 4521',
    timeline: [
      { status: 'Order Placed', date: '2024-09-02', description: 'Your order has been placed successfully' },
      { status: 'Confirmed', date: '2024-09-03', description: 'Order confirmed by artisan collective in Bastar' },
      { status: 'Crafting', date: '2024-09-04', description: 'Lost-wax casting process begun — this art form takes time' },
      { status: 'Packed', date: '2024-09-12', description: 'Carefully wrapped in protective packaging' },
      { status: 'Shipped', date: '2024-09-13', description: 'Shipped via DTDC Express (Tracking: D98765432)' },
    ],
  },

  // ── Order 3: Crafting ───────────────────────────────────────────────────
  {
    id: 'ORD-2024-003',
    date: '2024-09-15',
    status: 'crafting',
    items: [
      { productId: 'hs-1', quantity: 1 },
      { productId: 'hs-5', quantity: 1 },
    ],
    total: 16300,
    address: '7 Residency Road, Hyderabad, TS 500003',
    paymentMethod: 'UPI — PhonePe',
    timeline: [
      { status: 'Order Placed', date: '2024-09-15', description: 'Your order has been placed successfully' },
      { status: 'Confirmed', date: '2024-09-16', description: 'Order confirmed by master weaver Lakshmi Devi' },
      { status: 'Crafting', date: '2024-09-17', description: 'Handloom weaving in progress — estimated 10-12 days' },
    ],
  },

  // ── Order 4: Confirmed ──────────────────────────────────────────────────
  {
    id: 'ORD-2024-004',
    date: '2024-09-20',
    status: 'confirmed',
    items: [
      { productId: 'bp-1', quantity: 2 },
      { productId: 'je-1', quantity: 1 },
    ],
    total: 5900,
    address: '15-A Saket, New Delhi 110017',
    paymentMethod: 'Debit Card — ending 8873',
    timeline: [
      { status: 'Order Placed', date: '2024-09-20', description: 'Your order has been placed successfully' },
      { status: 'Confirmed', date: '2024-09-21', description: 'Order confirmed by Jaipur Blue Pottery Studio' },
    ],
  },

  // ── Order 5: Placed (just ordered) ─────────────────────────────────────
  {
    id: 'ORD-2024-005',
    date: '2024-09-25',
    status: 'placed',
    items: [
      { productId: 'wd-3', quantity: 1 },
      { productId: 'cn-4', quantity: 3 },
      { productId: 'jt-2', quantity: 1 },
    ],
    total: 4850,
    address: '42 Lakeview Lane, Bhopal, MP 462001',
    paymentMethod: 'Cash on Delivery',
    timeline: [
      { status: 'Order Placed', date: '2024-09-25', description: 'Your order has been placed successfully. Awaiting artisan confirmation.' },
    ],
  },
];
