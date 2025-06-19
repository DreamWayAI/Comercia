import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { MATERIAL_PRICES } from "@/lib/constants";

interface Room {
  id: number;
  area: number;
  type: string;
  material: string;
}

interface RoomCalculatorProps {
  rooms: Room[];
  onRoomsChange: (rooms: Room[]) => void;
  currency?: string;
}

export default function RoomCalculator({ rooms, onRoomsChange, currency = 'UAH' }: RoomCalculatorProps) {
  const [roomCounter, setRoomCounter] = useState(rooms.length || 1);

  const addRoom = () => {
    const newRoom: Room = {
      id: roomCounter + 1,
      area: 0,
      type: '1',
      material: 'enamel'
    };
    setRoomCounter(roomCounter + 1);
    onRoomsChange([...rooms, newRoom]);
  };

  const removeRoom = (roomId: number) => {
    if (rooms.length > 1) {
      onRoomsChange(rooms.filter(room => room.id !== roomId));
    }
  };

  const updateRoom = (roomId: number, field: keyof Room, value: any) => {
    const updatedRooms = rooms.map(room => {
      if (room.id === roomId) {
        return { ...room, [field]: value };
      }
      return room;
    });
    onRoomsChange(updatedRooms);
  };

  // Initialize with one room if empty using useEffect
  useEffect(() => {
    if (rooms.length === 0) {
      const initialRoom: Room = {
        id: 1,
        area: 0,
        type: '1',
        material: 'enamel'
      };
      onRoomsChange([initialRoom]);
    }
  }, [rooms.length, onRoomsChange]);

  if (rooms.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {rooms.map((room, index) => (
          <Card key={room.id} className="bg-gray-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">Приміщення {index + 1}</h4>
                {rooms.length > 1 && (
                  <Button
                    onClick={() => removeRoom(room.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="mb-4">
                <Label className="text-sm font-medium text-gray-700 mb-2">Площа (м²)</Label>
                <Input
                  type="number"
                  value={room.area || ""}
                  onChange={(e) => updateRoom(room.id, 'area', parseFloat(e.target.value) || 0)}
                  placeholder="0"
                  className="border-gray-200 focus:border-transparent"
                />
              </div>
              
              <div className="mb-4">
                <Label className="text-sm font-medium text-gray-700 mb-2">Кількість шарів</Label>
                <Select 
                  value={room.type} 
                  onValueChange={(value) => updateRoom(room.id, 'type', value)}
                >
                  <SelectTrigger className="border-gray-200 focus:border-transparent">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 шар (100 г/м²)</SelectItem>
                    <SelectItem value="2">2 шари (200 г/м²)</SelectItem>
                    <SelectItem value="3">3 шари (300 г/м²)</SelectItem>
                    <SelectItem value="4">4 шари (400 г/м²)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mb-4">
                <Label className="text-sm font-medium text-gray-700 mb-2">Матеріал</Label>
                <Select 
                  value={room.material} 
                  onValueChange={(value) => updateRoom(room.id, 'material', value)}
                >
                  <SelectTrigger className="border-gray-200 focus:border-transparent">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="enamel">
                      Емаль PoliBest 911 ({MATERIAL_PRICES[currency as keyof typeof MATERIAL_PRICES].enamel} {currency === 'UAH' ? 'грн' : '€'}/кг)
                    </SelectItem>
                    <SelectItem value="paint">
                      Фарба ({MATERIAL_PRICES[currency as keyof typeof MATERIAL_PRICES].paint} {currency === 'UAH' ? 'грн' : '€'}/кг)
                    </SelectItem>
                    <SelectItem value="primer">
                      Грунт ({MATERIAL_PRICES[currency as keyof typeof MATERIAL_PRICES].primer} {currency === 'UAH' ? 'грн' : '€'}/кг)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>
      
      <Button 
        onClick={addRoom}
        variant="outline"
        className="w-full border-2 border-dashed border-gray-300 hover:border-gray-400 py-3"
      >
        <Plus className="mr-2 h-4 w-4" />
        Додати приміщення
      </Button>
    </div>
  );
}
