export interface Product {
  id: string;
  name: string;
  shortName: string;
  category: string;
  categoryId: string;
  subcategory: string;
  collectionId?: string;
  description: string;
  longDescription: string;
  craftStory: string;
  price: number;
  originalPrice: number;
  discountPercent?: number;
  artisanId: string;
  artisanName: string;
  region: string;
  regionId: string;
  state: string;
  city: string;
  craftTechnique: string;
  material: string;
  dimensions: string;
  weight: string;
  color: string;
  variants?: ProductVariant[];
  stock: number;
  stockCount: number;
  availability: 'in-stock' | 'low-stock' | 'out-of-stock' | 'made-to-order';
  makingTime: string;
  craftingTime: string;
  moq: number;
  leadTime: string;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  hoverImage?: string;
  gallery: string[];
  has3D: boolean;
  model3D?: string;
  isFeatured3D?: boolean;
  isVerified: boolean;
  b2bAvailable: boolean;
  giStatus?: string;
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  tags: string[];
  careInstructions: string;
  shippingEstimate: string;
  returnEligible: boolean;
  createdAt: string;
}

export interface B2BOpportunity {
  id: string;
  title: string;
  category: string;
  quantity: number;
  budget: string;
  requiredBy: string;
  buyerName: string;
  buyerRequirement: string;
  matchPercentage: number;
  status: 'open' | 'applied' | 'negotiating';
}

export interface ProductVariant {
  id: string;
  label: string;
  type: 'color' | 'size' | 'pattern';
  value: string;
  priceAdjustment?: number;
  image?: string;
  inStock: boolean;
}

export interface Review {
  id: string;
  productId: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Artisan {
  id: string;
  name: string;
  location: string;
  regionId: string;
  state: string;
  city: string;
  craft: string;
  yearsOfExperience: number;
  portrait: string;
  workshopImages: string[];
  bio: string;
  quote: string;
  story: string;
  generation: string;
  specialties: string[];
  productCount: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  subcategories: string[];
}

export interface Collection {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  productIds: string[];
}

export interface Region {
  id: string;
  name: string;
  state: string;
  description: string;
  crafts: string[];
  image: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  variantId?: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'placed' | 'confirmed' | 'crafting' | 'packed' | 'shipped' | 'out-for-delivery' | 'delivered';
  items: CartItem[];
  total: number;
  address: string;
  paymentMethod: string;
  timeline: OrderEvent[];
}

export interface OrderEvent {
  status: string;
  date: string;
  description: string;
}

export interface Address {
  id: string;
  label: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'buyer' | 'seller' | 'artisan' | 'both';
  avatar?: string;
  addresses: Address[];
}

export interface InventoryItem {
  productId: string;
  stock: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'made-to-order';
  lastUpdated: string;
}
