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
  {
    id: 12,
    name: "Jabon Rey (Ultra instinto)",
    price: 7,
    category: "Hogar",
    description: "Jabon multi usos para toda la familia ",
    stock: 0,
  },
  {
    id: 6,
    name: "Tablet Pro 11",
    price: 549.99,
    category: "Electrónicos",
    description: "Pantalla OLED de 11 pulgadas",
    stock: 12,
  },
  {
    id: 7,
    name: "Mochila Outdoor",
    price: 79.99,
    category: "Deportes",
    description: "Resistente al agua, 40L de capacidad",
    stock: 18,
  },
  {
    id: 8,
    name: "Licuadora Smart",
    price: 199.99,
    category: "Hogar",
    description: "Control por app, múltiples programas",
    stock: 6,
  },
];

// Función para encontrar la mejor combinación de productos dentro del presupuesto
export function findBestCombination(availableProducts, budget) {
  if (!availableProducts || availableProducts.length === 0 || budget <= 0) {
    return { products: [], total: 0, remaining: budget };
  }

  // Filtrar solo productos en stock
  const productsInStock = availableProducts.filter(product => product.stock > 0);
  
  if (productsInStock.length === 0) {
    return { products: [], total: 0, remaining: budget };
  }
  
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
    remaining: budget - bestTotal
  };
}