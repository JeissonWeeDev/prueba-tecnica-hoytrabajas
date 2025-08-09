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

import { useState } from "react";
import ProductList from "@/component/ProductList";
import CartView from "./components/CartView";
import { BudgetCalculator } from "./components/BudgetCalculator";
import { mockProducts, findBestCombination } from "./lib/findBestCombination";

export default function Home() {
  // Estado del carrito de compras
  const [cartItems, setCartItems] = useState([]);

  //? Agrega un producto al carrito
  const addToCart = (product) => {
    // No agregar si no hay stock
    if (product.stock === 0) return; // No se agrega si no hay stock

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);

      // Si ya existe, incrementar cantidad
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Si es nuevo, agregar al carrito
      else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
          },
        ];
      }
    });
  };

  //? Elimina un producto del carrito
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  //? Actualiza la cantidad de un producto en el carrito
  const updateQuantity = (productId, quantity) => {
    // Si cantidad es 0, eliminar del carrito
    if (quantity === 0) { // Si la cantidad es 0, se elimina del carrito
      removeFromCart(productId);
      return;
    }

    // Actualizar cantidad
    setCartItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

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

        {/* Main Layout contenedor */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"> {/* Contenedor principal con diseño de cuadrícula */}
          {/* Columna Izquierda - Lista de Productos */}
          <div className="lg:col-span-2">
            <ProductList products={mockProducts} onAddToCart={addToCart} />
          </div>

          {/* Columna Derecha - Carrito y Calculadora de Presupuesto */}
          <div className="space-y-6">
            <CartView
              cartItems={cartItems}
              onRemoveFromCart={removeFromCart}
              onUpdateQuantity={updateQuantity}
            />

            <BudgetCalculator
              products={mockProducts}
              findBestCombination={findBestCombination}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
