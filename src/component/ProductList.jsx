/**
 * Componente que muestra la lista de productos pa' la tienda
 *
 * @param {Array} products - Los productos que vamos a mostrar
 * @param {Function} onAddToCart - La función que se llama cuando le dan al botón de agregar
 *
 * @author Jeisson Leon (c) 2025
 */


import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

export function ProductList({ products, onAddToCart }) {
  return (
    <div className="space-y-4">
      <h2 className="mb-6">Productos Disponibles</h2>

      {/* Grid de productos */}
      <div className="grid gap-4">
        {products.map((product) => (
          <Card
            key={product.id}
            className={`transition-shadow hover:shadow-md ${
              product.stock === 0 ? "opacity-60" : ""
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                {/* Info del producto */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-lg">{product.name}</CardTitle>

                    {/* Si no hay stock, muestra el badge */}
                    {product.stock === 0 && (
                      <Badge variant="destructive" className="text-xs">
                        Agotado
                      </Badge>
                    )}
                  </div>

                  {/* Descripción del producto */}
                  <p className="text-sm text-muted-foreground mb-2">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-2">
                    {/* Categoría */}
                    <Badge variant="secondary">{product.category}</Badge>

                    {/* Stock disponible */}
                    {product.stock > 0 && (
                      <span className="text-xs text-muted-foreground">
                        Quedan: {product.stock}
                      </span>
                    )}
                  </div>
                </div>

                {/* Precio */}
                <div className="text-right ml-4">
                  <p className="text-2xl font-semibold text-primary">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </CardHeader>

            {/* Botón pa' agregar al carrito */}
            <CardContent className="pt-0">
              <Button
                onClick={() => onAddToCart(product)}
                className="w-full"
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? "Ya no hay :(" : "Agregar al carrito"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
