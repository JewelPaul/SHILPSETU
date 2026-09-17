import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from '@/data/types';
import { products as initialProducts } from '@/data/products';
import { resolveAssetUrl } from '@/utils/assets';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  resetDemoData: () => void;
}

const STORAGE_KEY = 'shilpsetu_products_v2';

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((p: Product) => ({
            ...p,
            image: resolveAssetUrl(p.image),
            model3D: p.model3D ? resolveAssetUrl(p.model3D) : undefined,
            gallery: p.gallery ? p.gallery.map(resolveAssetUrl) : [],
            images: p.images ? p.images.map(resolveAssetUrl) : [],
          }));
        }
      }
    } catch {
      // ignore
    }
    return initialProducts;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch {
      // ignore storage quota errors
    }
  }, [products]);

  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const getProductById = (id: string) => {
    return products.find((p) => p.id === id);
  };

  const resetDemoData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setProducts(initialProducts);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        resetDemoData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
