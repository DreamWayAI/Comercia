import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import RoomCalculator from "@/components/room-calculator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface AreaStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function AreaStep({ data, onUpdate, onNext, onPrevious }: AreaStepProps) {
  const rooms = data.rooms || [];
  const totalArea = rooms.reduce((sum: number, room: any) => sum + (room.area || 0), 0);
  
  const canProceed = rooms.length > 0 && rooms.some((room: any) => room.area > 0);

  const handleRoomsChange = (newRooms: any[]) => {
    onUpdate({ ...data, rooms: newRooms, totalArea });
  };

  return (
    <div>
      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Розрахунок площі приміщень</h3>
          
          {/* Currency selection */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <Label className="text-sm font-medium text-gray-700 mb-2">Валюта розрахунків</Label>
            <Select 
              value={data.currency || "UAH"} 
              onValueChange={(value) => onUpdate({ ...data, currency: value })}
            >
              <SelectTrigger className="border-gray-200 focus:border-transparent">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UAH">🇺🇦 Гривня (UAH)</SelectItem>
                <SelectItem value="EUR">🇪🇺 Євро (EUR)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <RoomCalculator 
            rooms={rooms}
            onRoomsChange={handleRoomsChange}
            currency={data.currency}
          />
          
          <div className="mt-6 text-white p-4 rounded-xl" style={{ backgroundColor: 'hsl(347, 65%, 47%)' }}>
            <div className="flex items-center justify-between">
              <span className="font-semibold">Загальна площа:</span>
              <span className="text-xl font-bold">{totalArea.toFixed(1)} м²</span>
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
          disabled={!canProceed}
          className="flex-1 text-white py-4"
          style={{ backgroundColor: 'hsl(347, 65%, 47%)' }}
        >
          Далі
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
