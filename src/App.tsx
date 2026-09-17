import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ProductProvider } from '@/context/ProductContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { RecentlyViewedProvider } from '@/context/RecentlyViewedContext';

import Home from '@/pages/Home';
import About from '@/pages/About';
import HowItWorks from '@/pages/HowItWorks';
import CraftDiscovery from '@/pages/CraftDiscovery';
import Marketplace from '@/pages/Marketplace';
import ProductDetail from '@/pages/ProductDetail';
import ArtisanProfile from '@/pages/ArtisanProfile';
import CollectionDetail from '@/pages/CollectionDetail';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Profile from '@/pages/Profile';
import Orders from '@/pages/Orders';
import Wishlist from '@/pages/Wishlist';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import Search from '@/pages/Search';
import Settings from '@/pages/Settings';
import SellerDashboard from '@/pages/seller/SellerDashboard';
import SellerProducts from '@/pages/seller/SellerProducts';
import AddProduct from '@/pages/seller/AddProduct';
import SellerInventory from '@/pages/seller/SellerInventory';
import SellerPricing from '@/pages/seller/SellerPricing';
import SellerProfile from '@/pages/seller/SellerProfile';
import AITools from '@/pages/seller/AITools';
import SellerB2B from '@/pages/seller/SellerB2B';
import SellerOrders from '@/pages/seller/SellerOrders';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <WishlistProvider>
            <RecentlyViewedProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/crafts" element={<CraftDiscovery />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/marketplace/product/:id" element={<ProductDetail />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/artisan/:id" element={<ArtisanProfile />} />
                <Route path="/collections/:id" element={<CollectionDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/account" element={<Profile />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/search" element={<Search />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/seller" element={<SellerDashboard />} />
                <Route path="/seller/products" element={<SellerProducts />} />
                <Route path="/seller/products/new" element={<AddProduct />} />
                <Route path="/seller/orders" element={<SellerOrders />} />
                <Route path="/seller/b2b" element={<SellerB2B />} />
                <Route path="/seller/inventory" element={<SellerInventory />} />
                <Route path="/seller/pricing" element={<SellerPricing />} />
                <Route path="/seller/profile" element={<SellerProfile />} />
                <Route path="/seller/ai-tools" element={<AITools />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </RecentlyViewedProvider>
            </WishlistProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
