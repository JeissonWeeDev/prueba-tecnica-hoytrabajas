import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from "./ui";

export function ProductList({ products, onAddToCart }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Productos Disponibles</h2>
      <div className="grid gap-4">
        {products.map((product) => (
          <Card key={product.id} className={`transition-shadow hover:shadow-lg ${product.stock === 0 ? 'opacity-60' : ''}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    {product.stock === 0 && (
                      <Badge variant="destructive" className="text-xs">
                        Agotado
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {product.category}
                    </Badge>
                    {product.stock > 0 && (
                      <span className="text-xs text-gray-500">
                        Stock: {product.stock}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="text-2xl font-bold text-slate-900">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Button 
                onClick={() => onAddToCart(product)}
                className="w-full"
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? 'Producto Agotado' : 'Agregar al carrito'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}