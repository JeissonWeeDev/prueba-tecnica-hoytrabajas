// Función para encontrar la mejor combinación de productos dentro del presupuesto
export function findBestCombination(products, budget) {
  if (!products || products.length === 0 || budget <= 0) {
    return { products: [], total: 0 };
  }

  // Filtrar solo productos en stock
  const availableProducts = products.filter(product => product.stock > 0);
  
  let bestCombination = [];
  let bestTotal = 0;

  // Generar todas las combinaciones posibles usando bits
  const totalCombinations = Math.pow(2, availableProducts.length);
  
  for (let i = 1; i < totalCombinations; i++) {
    const currentCombination = [];
    let currentTotal = 0;
    
    for (let j = 0; j < availableProducts.length; j++) {
      if (i & (1 << j)) {
        currentCombination.push(availableProducts[j]);
        currentTotal += availableProducts[j].price;
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

// Mock data de productos con el nuevo esquema
export const mockProducts = [
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
  }
];