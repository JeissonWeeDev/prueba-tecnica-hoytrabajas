import { useState } from "react";
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label, Separator, Badge } from "./ui";
import { Calculator, TrendingUp } from "lucide-react";

export function BudgetCalculator({ products, findBestCombination }) {
  const [budget, setBudget] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const budgetValue = parseFloat(budget);
    if (isNaN(budgetValue) || budgetValue <= 0) {
      return;
    }
    
    const bestCombination = findBestCombination(products, budgetValue);
    setResult(bestCombination);
  };

  const handleReset = () => {
    setBudget("");
    setResult(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Calculadora de Presupuesto
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="budget">Presupuesto disponible</Label>
          <div className="flex gap-2">
            <Input
              id="budget"
              type="number"
              placeholder="Ej: 1000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleCalculate} disabled={!budget}>
              Calcular
            </Button>
          </div>
        </div>

        {result && (
          <div className="space-y-4">
            <Separator />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Mejor Combinación
                </h4>
                <Button variant="outline" size="sm" onClick={handleReset}>
                  Limpiar
                </Button>
              </div>
              
              {result.products.length === 0 ? (
                <p className="text-gray-500">
                  No hay productos disponibles que encajen en tu presupuesto.
                </p>
              ) : (
                <>
                  <div className="space-y-3">
                    {result.products.map((product) => (
                      <div key={product.id} className="p-3 bg-gray-50 rounded-md border border-gray-200">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-gray-900">{product.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {product.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">
                              {product.description}
                            </p>
                          </div>
                          <span className="font-semibold text-slate-900">${product.price.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Presupuesto:</span>
                      <span className="font-semibold">${parseFloat(budget).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Total optimizado:</span>
                      <span className="font-semibold text-slate-900">${result.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Sobrante:</span>
                      <span className="font-semibold text-green-600">${result.remaining.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Eficiencia:</span>
                      <span>{((result.total / parseFloat(budget)) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="text-xs text-gray-500 pt-1">
                      * Solo se consideran productos en stock
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}