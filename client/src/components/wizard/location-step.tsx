import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import { COUNTRIES, CITIES } from "@/lib/constants";

interface LocationStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function LocationStep({ data, onUpdate, onNext, onPrevious }: LocationStepProps) {
  const [country, setCountry] = useState(data.country || "");
  const [city, setCity] = useState(data.city || "");
  const [company, setCompany] = useState(data.company || "");
  const [isCustomCity, setIsCustomCity] = useState(false);

  const canProceed = country && city;

  const handleCountryChange = (value: string) => {
    setCountry(value);
    setCity(""); // Reset city when country changes
    setIsCustomCity(false);
    onUpdate({ ...data, country: value, city: "" });
  };

  const handleCityChange = (value: string) => {
    if (value === "custom") {
      setIsCustomCity(true);
      setCity("");
    } else {
      setIsCustomCity(false);
      setCity(value);
      onUpdate({ ...data, city: value });
    }
  };

  const handleCustomCityChange = (value: string) => {
    setCity(value);
    onUpdate({ ...data, city: value });
  };

  const handleCompanyChange = (value: string) => {
    setCompany(value);
    onUpdate({ ...data, company: value });
  };

  const availableCities = country ? CITIES[country] || [] : [];

  return (
    <div>
      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Оберіть локацію проекту</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Країна</label>
              <Select value={country} onValueChange={handleCountryChange}>
                <SelectTrigger className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:border-transparent">
                  <SelectValue placeholder="Оберіть країну" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((countryOption) => (
                    <SelectItem key={countryOption.value} value={countryOption.value}>
                      {countryOption.flag} {countryOption.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Місто</label>
              {!isCustomCity ? (
                <Select value={city} onValueChange={handleCityChange} disabled={!country}>
                  <SelectTrigger className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:border-transparent">
                    <SelectValue placeholder={country ? "Оберіть місто" : "Спочатку оберіть країну"} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCities.map((cityOption) => (
                      <SelectItem key={cityOption} value={cityOption}>
                        {cityOption}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">Інше місто (ввести власне)</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="space-y-2">
                  <Input
                    placeholder="Введіть назву міста"
                    value={city}
                    onChange={(e) => handleCustomCityChange(e.target.value)}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:border-transparent"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsCustomCity(false);
                      setCity("");
                      onUpdate({ ...data, city: "" });
                    }}
                  >
                    Повернутися до списку міст
                  </Button>
                </div>
              )}
            </div>
            
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-3">Компанія (необов'язково)</Label>
              <Input
                placeholder="Назва компанії"
                value={company}
                onChange={(e) => handleCompanyChange(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:border-transparent mt-3"
              />
            </div>
            
            <div className="bg-blue-50 p-4 rounded-xl">
              <div className="flex items-start space-x-3">
                <Info className="text-polibest-red mt-1 w-5 h-5" />
                <div>
                  <h4 className="font-semibold text-gray-900">Чому важлива локація?</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Ціни на матеріали та доставку відрізняються залежно від регіону
                  </p>
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
          disabled={!canProceed}
          className="flex-1 bg-polibest-red hover:bg-polibest-dark py-4"
        >
          Далі
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
