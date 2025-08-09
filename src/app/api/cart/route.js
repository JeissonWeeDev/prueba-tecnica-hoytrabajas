/**
 * ! Este módulo define las rutas de la API para la gestión del carrito de compras.
 *
 * * Características:
 * * - Proporciona una ruta GET para obtener el contenido actual del carrito.
 * * - Proporciona una ruta POST para agregar productos al carrito.
 *
 * ? Uso recomendado:
 * ? - GET /api/cart → No requiere body, devuelve array de productos
 * ? - POST /api/cart → Espera {productId: number}, devuelve carrito actualizado
 * ?   Ejemplo body POST: {"productId": 1}
 *
 * TODO: Implementar rutas PUT y DELETE para modificar y eliminar productos del carrito.
 *
 * @author Jeisson Leon (c) 2025
 * @license MIT
 */

import { products } from "@/lib/products";

// Variable global para simular el carrito en memoria del servidor
let cart = [];

// GET → Devolver el contenido actual del carrito
export async function GET() {
  return new Response(JSON.stringify({ success: true, data: cart }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// POST → Agregar un producto al carrito
export async function POST(request) {
  try {
    const { productId } = await request.json();

    if (!productId) {
      return new Response(
        JSON.stringify({ success: false, message: "productId is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const product = products.find((p) => p.id === productId);

    if (!product) {
      return new Response(
        JSON.stringify({ success: false, message: "Product not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    if (product.stock === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Product out of stock" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const existingItemIndex = cart.findIndex((item) => item.id === productId);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Product added to cart",
        data: cart,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// DELETE → Eliminar un producto del carrito
export async function DELETE(request) {
  try {
    const { productId } = await request.json();

    if (!productId) {
      return new Response(
        JSON.stringify({ success: false, message: "productId is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    cart = cart.filter((item) => item.id !== productId);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Product removed from cart",
        data: cart,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// PUT → Actualizar cantidad de un producto en el carrito
export async function PUT(request) {
  try {
    const { productId, quantity } = await request.json();

    if (!productId || quantity === undefined) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "productId and quantity are required",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (quantity === 0) {
      cart = cart.filter((item) => item.id !== productId);
    } else {
      const itemIndex = cart.findIndex((item) => item.id === productId);
      if (itemIndex !== -1) {
        cart[itemIndex].quantity = quantity;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Cart updated",
        data: cart,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
