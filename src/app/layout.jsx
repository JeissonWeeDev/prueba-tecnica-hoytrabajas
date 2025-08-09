import './globals.css';

export const metadata = {
  title: 'Tienda Online con Optimizador de Presupuesto',
  description: 'Encuentra la mejor combinación de productos para tu presupuesto',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}