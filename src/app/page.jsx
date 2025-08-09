"use client";

import { useState } from "react";
import { ProductList } from "../components/ProductList";
import { CartView } from "../components/CartView";
import { BudgetCalculator } from "../components/BudgetCalculator";
import { products, findBestCombination } from "../lib/products";

export default function HomePage() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    // Verificar que el producto tenga stock antes de agregar
    if (product.stock === 0) {
      return;
    }

    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { 
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1 
        }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tienda Online con Optimizador de Presupuesto
          </h1>
          <p className="text-gray-600">
            Encuentra la mejor combinación de productos para tu presupuesto
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Product List */}
          <div className="lg:col-span-2">
            <ProductList 
              products={products} 
              onAddToCart={addToCart}
            />
          </div>

          {/* Right Column - Cart and Budget Calculator */}
          <div className="space-y-6">
            <CartView
              cartItems={cartItems}
              onRemoveFromCart={removeFromCart}
              onUpdateQuantity={updateQuantity}
            />
            
            <BudgetCalculator
              products={products}
              findBestCombination={findBestCombination}
            />
          </div>
        </div>
      </div>
    </div>
  );
}