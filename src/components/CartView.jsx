import { Button, Card, CardContent, CardHeader, CardTitle, Separator } from "./ui";
import { Trash2 } from "lucide-react";

export function CartView({ cartItems, onRemoveFromCart, onUpdateQuantity }) {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Carrito de Compras</span>
          <span className="text-sm font-normal text-gray-500">
            {cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            Tu carrito está vacío
          </p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-600">
                    ${item.price.toFixed(2)} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-md">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="h-8 w-8 p-0 hover:bg-gray-100"
                    >
                      -
                    </Button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="h-8 w-8 p-0 hover:bg-gray-100"
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between items-center pt-2">
              <span className="text-lg font-semibold text-gray-900">Total:</span>
              <span className="text-xl font-bold text-slate-900">${total.toFixed(2)}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}