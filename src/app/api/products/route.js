/**
* ! Este módulo define las rutas de la API para la gestión de productos.

* * Características:
* * - Proporciona una ruta GET para obtener todos los productos disponibles.

* ? Uso recomendado:
* ? - Acceder a `/api/products` para obtener la lista completa de productos.

* TODO: Implementar rutas POST, PUT, DELETE para la gestión completa de productos.

@author Jeisson Leon (c) 2025
@license MIT
*/

import { products } from "@/lib/products";

export async function GET() {
  return new Response(
    JSON.stringify(products),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}

