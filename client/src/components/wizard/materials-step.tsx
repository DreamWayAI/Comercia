import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import { MATERIAL_PRICES, COVERAGE_RATES } from "@/lib/constants";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface MaterialsStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function MaterialsStep({ data, onUpdate, onNext, onPrevious }: MaterialsStepProps) {
  const rooms = data.rooms || [];

  useEffect(() => {
    calculateMaterials();
  }, []);

  const calculateMaterials = () => {
    let totalCost = 0;
    const calculatedRooms = rooms.map((room: any) => {
      const area = room.area || 0;
      const type = room.type || '1';
      const material = room.material || 'enamel';
      
      if (area > 0) {
        const rates = COVERAGE_RATES[type as '1' | '2' | '3' | '4'] || COVERAGE_RATES['1'];
        const materialRate = rates[material as keyof typeof rates];
        const currency = data.currency || 'UAH';
        const materialPrice = MATERIAL_PRICES[currency as keyof typeof MATERIAL_PRICES][material as keyof typeof MATERIAL_PRICES.UAH];
        
        const materialQty = area * materialRate;
        const materialCost = materialQty * materialPrice;
        
        totalCost += materialCost;
        
        return {
          ...room,
          materialQty,
          materialCost
        };
      }
      return room;
    });

    const discountPercent = data.discountPercent || 20;
    const discount = totalCost * (discountPercent / 100);
    const finalCost = totalCost - discount;

    onUpdate({
      ...data,
      rooms: calculatedRooms,
      materialsCost: totalCost,
      discountPercent,
      discount,
      finalCost
    });
  };

  // Calculate material totals by type
  const materialTotals = rooms.reduce((totals: any, room: any) => {
    const material = room.material || 'enamel';
    const qty = room.materialQty || 0;
    totals[material] = (totals[material] || 0) + qty;
    return totals;
  }, {});

  const getMaterialLabel = (material: string) => {
    switch (material) {
      case 'enamel': return 'Емаль PoliBest 911';
      case 'paint': return 'Фарба';
      case 'primer': return 'Грунт';
      default: return material;
    }
  };

  const getMaterialPrice = (material: string) => {
    const currency = data.currency || 'UAH';
    const currencySymbol = currency === 'UAH' ? 'грн' : '€';
    const prices = MATERIAL_PRICES[currency as keyof typeof MATERIAL_PRICES];
    const price = prices[material as keyof typeof prices];
    return `${price} ${currencySymbol}/кг`;
  };

  return (
    <div>
      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Вибір матеріалів та розрахунок</h3>
          
          <div className="space-y-6">
            {/* Material overview cards */}
            <div className="grid gap-4">
              {Object.entries(materialTotals).map(([material, quantity]) => (
                <div key={material} className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">{getMaterialLabel(material)}</h5>
                  <p className="text-sm text-gray-600">Ціна: {getMaterialPrice(material)}</p>
                  <p className="text-sm text-gray-600 mt-1">Розхід: 100 грамів на 1 м² за шар</p>
                  <div className="mt-2 text-sm">
                    <span className="text-gray-600">Загальна кількість: </span>
                    <span className="font-semibold">{(quantity as number).toFixed(1)} кг</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Discount selection */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <Label className="text-sm font-medium text-gray-700 mb-2">Знижка</Label>
              <Select 
                value={String(data.discountPercent || 20)} 
                onValueChange={(value) => {
                  const newData = { ...data, discountPercent: parseInt(value) };
                  onUpdate(newData);
                  setTimeout(calculateMaterials, 0);
                }}
              >
                <SelectTrigger className="border-gray-200 focus:border-transparent">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10%</SelectItem>
                  <SelectItem value="15">15%</SelectItem>
                  <SelectItem value="20">20%</SelectItem>
                  <SelectItem value="25">25%</SelectItem>
                  <SelectItem value="30">30%</SelectItem>
                  <SelectItem value="35">35%</SelectItem>
                  <SelectItem value="40">40%</SelectItem>
                  <SelectItem value="45">45%</SelectItem>
                  <SelectItem value="50">50%</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Pricing summary */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-4">Розрахунок вартості</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Вартість матеріалів:</span>
                  <span className="font-semibold">{(data.materialsCost || 0).toLocaleString()} {data.currency === 'UAH' ? 'грн' : '€'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Знижка ({data.discountPercent || 20}%):</span>
                  <span className="font-semibold text-green-600">-{(data.discount || 0).toLocaleString()} {data.currency === 'UAH' ? 'грн' : '€'}</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-bold text-gray-900">Загальна сума:</span>
                  <span className="font-bold text-polibest-red text-xl">{(data.finalCost || 0).toLocaleString()} {data.currency === 'UAH' ? 'грн' : '€'}</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Info className="text-yellow-600 mt-0.5 w-5 h-5" />
                  <div>
                    <p className="text-sm text-yellow-800"><strong>Термін виготовлення:</strong> до 9 календарних днів</p>
                    <p className="text-sm text-yellow-800"><strong>Гарантія:</strong> 7 років на матеріали</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex space-x-4">
        <Button 
          onClick={onPrevious}
          variant="outline"
          className="flex-1 py-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад
        </Button>
        <Button 
          onClick={onNext}
          className="flex-1 bg-polibest-red hover:bg-polibest-dark py-4"
        >
          Далі
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
