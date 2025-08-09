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

// Carrito en memoria (variable global)
let cart = [];

//? GET → devolver carrito actual
export async function GET() {
  return new Response(JSON.stringify(cart), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

//? POST → agregar producto al carrito
export async function POST(request) {
  try {
    const { productId } = await request.json();

    // Buscar producto en la lista de productos
    const product = products.find((p) => p.id === productId);

    if (!product) {
      return new Response(
        JSON.stringify({ error: "Producto no encontrado :(" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    //? Agregar producto al carrito ---------------------
    cart.push(product);

    return new Response(
      JSON.stringify({ message: "Producto agregado al carrito", cart }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error procesando la solicitud" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}