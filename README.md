# 🛒 Prueba Técnica – API y Carrito de Compras (Next.js 14 + Bun)

Este proyecto es mi propuesta de solución para la prueba técnica de HoyTrabajas.
Desarrollé una API sencilla para gestionar productos y un carrito de compras, junto con un frontend que interactúa con ella.
Además, incluye una función que calcula la mejor combinación de productos según un presupuesto máximo.

---

## 🚀 Tecnologías utilizadas

- **Next.js 14 (App Router)** → API y frontend en un solo proyecto.
- **React** → Componentes y UI.
- **JavaScript** → Mi lenguaje preferido para un desarrollo ágil.
- **Bun.js** → Gestor y runtime rápido (compatible con `npm` y `pnpm`).
- **Vercel** → Deploy rápido y sin configuración extra.

---

## 📂 Estructura del proyecto

```
/app
 ├── /api
 │    ├── products/route.js      # Endpoint GET lista de productos
 │    └── cart/route.js          # Endpoint GET y POST para carrito
 ├── /components
 │    ├── ProductList.jsx        # Lista de productos
 │    ├── CartView.jsx           # Vista del carrito
 │    └── BudgetCalculator.jsx   # Calculadora de combinación por presupuesto
 ├── page.js                     # Página principal
/lib
 ├── products.js                 # Lista estática de productos
 └── findBestCombination.js      # Lógica de cálculo de combinaciones
package.json
README.md
```
---

## 📌 Funcionalidades

### **Backend (API)**
- **GET /api/products** → Obtiene una lista estática de productos.
- **POST /api/cart** → Añade un producto al carrito (en memoria) usando su `productId`.
- **GET /api/cart** → Muestra el estado actual del carrito con los productos agregados.

> Importante: El carrito se mantiene en memoria (no hay base de datos), así que se reinicia si el servidor se apaga.

### **Frontend**
- Lista de productos obtenida desde la API.
- Botón “Agregar al carrito” para enviar productos al backend.
- Vista del carrito con el total calculado.
- Calculadora para encontrar la mejor combinación de productos sin exceder un presupuesto.

---

## 🧮 Lógica – findBestCombination
Esta función toma:
- Una lista de productos (array).
- Un presupuesto máximo (número).

Y devuelve:
- Lista de productos cuya suma sea la más alta posible sin superar el presupuesto.
- Ejemplo: presupuesto = 150  
  Resultado → [Producto 1 (60), Producto 4 (70)] con total 130.

---

## 🖥️ Instalación y ejecución
> **Antes de empezar**: Necesitas tener instalado [Bun.js](https://bun.sh/) o, en su lugar, `npm` o `pnpm`.

### **Clonar el repositorio**
git clone https://github.com/usuario/carrito-hoytrabajas.git
cd carrito-hoytrabajas

### **Instalar dependencias**
Con Bun:
bun install

Con npm:
npm install

Con pnpm:
pnpm install

### **Ejecutar en desarrollo**
Con Bun:
bun dev

Con npm:
npm run dev

Con pnpm:
pnpm dev

El proyecto estará disponible en:  
http://localhost:3000

---

## 🌍 Deploy
¿Quieres desplegarlo en Vercel? ¡Es muy fácil!
1. Sube el repositorio a GitHub.
2. Conecta tu cuenta de [Vercel](https://vercel.com/) con tu repositorio.
3. Selecciona el proyecto y Vercel detectará automáticamente que es Next.js. ¡Solo dale a desplegar!
4. ¡Listo! Tendrás una URL pública para tu aplicación.

---

## 📄 Notas importantes
- No implementé autenticación ni manejo de stock, ya que no eran parte de los requisitos.
- El carrito no persiste datos (se guarda en memoria del servidor).
- La carga inicial de productos usa SSR para optimizar tiempos de respuesta.
- Compatible con **Bun**, **npm** y **pnpm**.

---

## ✨ Autor
**Jeisson Leon** – [LinkedIn](https://www.linkedin.com/)
