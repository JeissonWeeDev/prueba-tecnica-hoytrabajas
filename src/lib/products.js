/**
** Módulo de datos de productos para prueba técnica

* ! Este módulo exporta un conjunto estático de productos simulados que pueden ser utilizados

* * Características:
* * - Cada producto tiene id, nombre, precio y categoría
* * - Precios realistas para diferentes categorías

* ? Uso recomendado:
* ? 1. Importar en componentes que necesiten mostrar/listar productos
* ? 2. Puede ser usado como base para conectar con API real posteriormente

* TODO Ejemplo de uso:
* TODO import { products } from '/lib/products';

@author Jeisson León (c) 2025
@license MIT
*/

//? Lista completa de productos simulados
export const products = [
  {
    id: 1,
    name: "Smartphone X1",
    price: 799.99,
    category: "Electrónicos",
    description: "Último modelo con cámara triple",
    stock: 15,
  },
  {
    id: 2,
    name: "Zapatos Running Pro",
    price: 129.99,
    category: "Deportes",
    description: "Amortiguación avanzada para corredores",
    stock: 32,
  },
  {
    id: 3,
    name: "Cafetera Premium",
    price: 149.5,
    category: "Hogar",
    description: "Prepara café de especialidad en casa",
    stock: 8,
  },
  {
    id: 4,
    name: "Libro de React Avanzado",
    price: 34.99,
    category: "Libros",
    description: "Guía completa para desarrollo con React",
    stock: 21,
  },
  {
    id: 5,
    name: "Auriculares Inalámbricos",
    price: 89.99,
    category: "Electrónicos",
    description: "Cancelación de ruido activa",
    stock: 0, // Agotado
  },
];

// Función para encontrar la mejor combinación de productos dentro del presupuesto
export function findBestCombination(availableProducts, budget) {
  if (!availableProducts || availableProducts.length === 0 || budget <= 0) {
    return { products: [], total: 0 };
  }

  // Filtrar solo productos en stock
  const productsInStock = availableProducts.filter(
    (product) => product.stock > 0
  );

  let bestCombination = [];
  let bestTotal = 0;

  // Generar todas las combinaciones posibles usando bits
  const totalCombinations = Math.pow(2, productsInStock.length);

  for (let i = 1; i < totalCombinations; i++) {
    const currentCombination = [];
    let currentTotal = 0;

    for (let j = 0; j < productsInStock.length; j++) {
      if (i & (1 << j)) {
        currentCombination.push(productsInStock[j]);
        currentTotal += productsInStock[j].price;
      }
    }

    // Si esta combinación está dentro del presupuesto y es mejor que la actual
    if (currentTotal <= budget && currentTotal > bestTotal) {
      bestCombination = currentCombination;
      bestTotal = currentTotal;
    }
  }

  return {
    products: bestCombination,
    total: bestTotal,
    remaining: budget - bestTotal,
  };
}
