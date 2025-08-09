/**
 * ! Componente principal de la aplicación de tienda online
 *
 * * Características clave:
 * * - Muestra una lista de productos disponibles para la compra.
 * * - Permite a los usuarios añadir y eliminar productos de su carrito de compras.
 * * - Incorpora un optimizador de presupuesto para sugerir combinaciones de productos.
 *
 * ? Uso:
 * ? - ProductList: Encargado de mostrar los productos y gestionar la adición al carrito.
 * ? - CartView: Visualiza y administra los artículos que se encuentran actualmente en el carrito.
 * ? - BudgetCalculator: Ofrece sugerencias para combinaciones óptimas de productos según el presupuesto.
 *
 * @author Jeisson Leon (c) 2025 - Todos los derechos reservados.
 * @license Licencia MIT - Para más detalles, consulta el archivo LICENSE.
 */

"use client";

import { useState, useEffect } from "react";
import { ProductList } from "./components/ProductList";
import { CartView } from "./components/CartView";
import { BudgetCalculator } from "./components/BudgetCalculator";
import { findBestCombination } from "./lib/products";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar productos desde la API al montar el componente
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const result = await response.json();
      if (result.success) {
        setProducts(result.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await fetch("/api/cart");
      const result = await response.json();
      if (result.success) {
        setCartItems(result.data);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (product) => {
    // Verificar que el producto tenga stock antes de agregar
    if (product.stock === 0) {
      return;
    }

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product.id }),
      });

      const result = await response.json();
      if (result.success) {
        // Actualizar el carrito con la respuesta del servidor
        setCartItems(result.data);
      } else {
        console.error("Error adding to cart:", result.message);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      const result = await response.json();
      if (result.success) {
        setCartItems(result.data);
      } else {
        console.error("Error removing from cart:", result.message);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      });

      const result = await response.json();
      if (result.success) {
        setCartItems(result.data);
      } else {
        console.error("Error updating cart:", result.message);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Tienda Online con Optimizador de Presupuesto</h1>
          <p className="text-muted-foreground">
            Encuentra la mejor combinación de productos para tu presupuesto
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Product List */}
          <div className="lg:col-span-2">
            <ProductList products={products} onAddToCart={addToCart} />
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
