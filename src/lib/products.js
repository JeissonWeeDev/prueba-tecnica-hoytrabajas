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
    sku: "ELEC-SM-X1-2025",
  },
  {
    id: 2,
    name: "Zapatos Running Pro",
    price: 129.99,
    category: "Deportes",
    description: "Amortiguación avanzada para corredores",
    stock: 32,
    sku: "DEP-ZAP-RP-2025",
  },
  {
    id: 3,
    name: "Cafetera Premium",
    price: 149.5,
    category: "Hogar",
    description: "Prepara café de especialidad en casa",
    stock: 8,
    sku: "HOG-CAF-PR-2025",
  },
  {
    id: 4,
    name: "Libro de React Avanzado",
    price: 34.99,
    category: "Libros",
    description: "Guía completa para desarrollo con React",
    stock: 21,
    sku: "LIB-REACT-25",
  },
  {
    id: 5,
    name: "Auriculares Inalámbricos",
    price: 89.99,
    category: "Electrónicos",
    description: "Cancelación de ruido activa",
    stock: 0, // Agotado
    sku: "ELEC-AUR-IN-2025",
  },
];
