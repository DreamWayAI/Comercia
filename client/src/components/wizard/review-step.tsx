import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, FileDown, Plus } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { generatePDF } from "@/lib/pdf-generator";

interface ReviewStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  onReset: () => void;
}

export default function ReviewStep({ data, onPrevious, onReset }: ReviewStepProps) {
  const { toast } = useToast();

  const createProposalMutation = useMutation({
    mutationFn: async (proposalData: any) => {
      const response = await apiRequest("POST", "/api/proposals", proposalData);
      return response.json();
    },
    onSuccess: (result) => {
      toast({
        title: "Пропозиція збережена",
        description: "Ваша комерційна пропозиція успішно створена",
      });
    },
    onError: () => {
      toast({
        title: "Помилка",
        description: "Не вдалося зберегти пропозицію",
        variant: "destructive",
      });
    },
  });

  const handleExportPDF = async () => {
    try {
      await generatePDF(data);
      toast({
        title: "PDF експорт",
        description: "PDF файл було успішно створено та завантажено",
      });
    } catch (error) {
      console.error("PDF export error:", error);
      toast({
        title: "Помилка експорту",
        description: error instanceof Error ? error.message : "Не вдалося створити PDF файл",
        variant: "destructive",
      });
    }
  };

  const handleSaveProposal = () => {
    // Convert string values to numbers for validation
    const proposalData = {
      ...data,
      totalArea: parseFloat(data.totalArea) || 0,
      materialsCost: parseFloat(data.materialsCost) || 0,
      discountPercent: parseFloat(data.discountPercent) || 0,
      discount: parseFloat(data.discount) || 0,
      finalCost: parseFloat(data.finalCost) || 0,
      company: data.company || null,
    };
    createProposalMutation.mutate(proposalData);
  };

  const getCountryLabel = (value: string) => {
    const countryMap: { [key: string]: string } = {
      ukraine: "🇺🇦 Україна",
      poland: "🇵🇱 Польща",
      romania: "🇷🇴 Румунія"
    };
    return countryMap[value] || value;
  };

  return (
    <div>
      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Огляд пропозиції</h3>
          
          <div className="space-y-6">
            {/* Project summary */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-3">Деталі проекту</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Країна:</span>
                  <span className="font-medium ml-2">{getCountryLabel(data.country)}</span>
                </div>
                <div>
                  <span className="text-gray-600">Місто:</span>
                  <span className="font-medium ml-2">{data.city}</span>
                </div>
                <div>
                  <span className="text-gray-600">Приміщень:</span>
                  <span className="font-medium ml-2">{data.rooms?.length || 0}</span>
                </div>
                <div>
                  <span className="text-gray-600">Загальна площа:</span>
                  <span className="font-medium ml-2">{(data.totalArea || 0).toFixed(1)} м²</span>
                </div>
              </div>
            </div>
            
            {/* Final cost breakdown */}
            <div className="border border-polibest-red rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Фінальна вартість</h4>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Матеріали з ПДВ:</span>
                  <span>{(data.materialsCost || 0).toLocaleString()} {data.currency === 'UAH' ? 'грн' : '€'}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Дилерська знижка ({data.discountPercent || 20}%):</span>
                  <span>-{(data.discount || 0).toLocaleString()} {data.currency === 'UAH' ? 'грн' : '€'}</span>
                </div>
              </div>
              <div className="border-t pt-4 flex justify-between text-xl font-bold">
                <span>Підсумок:</span>
                <span className="text-polibest-red">{(data.finalCost || 0).toLocaleString()} {data.currency === 'UAH' ? 'грн' : '€'}</span>
              </div>
            </div>
            
            {/* Export options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button 
                onClick={handleExportPDF}
                className="bg-polibest-red hover:bg-polibest-dark py-4"
              >
                <FileText className="mr-2 h-5 w-5" />
                Експорт PDF
              </Button>
              <Button 
                onClick={handleSaveProposal}
                disabled={createProposalMutation.isPending}
                variant="outline"
                className="py-4"
              >
                <FileDown className="mr-2 h-5 w-5" />
                {createProposalMutation.isPending ? "Збереження..." : "Зберегти"}
              </Button>
            </div>
            
            {/* Material Information Section */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-4">Про матеріали PoliBest 911</h4>
              
              <div className="space-y-4 text-sm text-gray-700">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">Опис матеріалу:</h5>
                  <p>Полімерне покриття без розчинників PoliBest™ 911 рекомендується для облаштування бетонних підлог і стін, як декоративно-захисне покриття з високою стійкістю до механічних і хімічних пошкоджень і в якості захисту на відкритих бетонних майданчиках в промисловому будівництві.</p>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">Сфери застосування:</h5>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Автомобільні бетонні дороги, бетонні плити, злітно-посадкові смуги</li>
                    <li>Підлоги та стіни паркінгів, автостоянок та автосервісу</li>
                    <li>Підлоги в морозильних камерах і холодильниках</li>
                    <li>Залізобетонні конструкції і споруди (ангари, склади, заводи)</li>
                    <li>Виробничі підлоги у харчових підприємствах</li>
                    <li>Підлоги фармацевтичних підприємств</li>
                    <li>Торгово-розважальні центри та лікувальні установи</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">Основні переваги:</h5>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Матеріал без запаху та розчинників</li>
                    <li>Економічна витрата</li>
                    <li>Висока стійкість до механічних і хімічних пошкоджень</li>
                    <li>Легко наноситься: валик, шпатель, розпилювач</li>
                    <li>Знепилення та максимальне затвердіння бетонної поверхні</li>
                    <li>Тривалий термін служби покриття</li>
                    <li>Паропроникний та стійкий до ультрафіолету</li>
                    <li>Не втрачає властивостей при низьких температурах</li>
                    <li>Пожежобезпечний (без летких речовин)</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">Технічні параметри:</h5>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Тип:</strong> двокомпонентний</li>
                    <li><strong>Колір:</strong> згідно з замовленням, RAL</li>
                    <li><strong>Термін служби в змішаному стані:</strong> від 30 хв (+30°C) до 3 год (+10°C)</li>
                    <li><strong>Початок експлуатації:</strong> 24 години - пішохідні навантаження, 5 днів - механічні навантаження</li>
                    <li><strong>Повна полімеризація:</strong> 7 днів для хімічної обробки</li>
                    <li><strong>Адгезія:</strong> покриття перевершує міцність бетону</li>
                  </ul>
                </div>
                
                <div className="border-t pt-4">
                  <p className="text-xs text-gray-600">
                    Полімерне покриття без токсичного запаху при нанесенні на бетонну поверхню глибоко проникає в бетон, 
                    додатково зміцнюючи поверхню. Висока адгезія забезпечує повну гідроізоляцію поверхні, 
                    не відшаровується від поверхні з часом, є паропроникним матеріалом.
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
          onClick={onReset}
          className="flex-1 bg-green-600 hover:bg-green-700 py-4"
        >
          <Plus className="mr-2 h-4 w-4" />
          Нова пропозиція
        </Button>
      </div>
    </div>
  );
}
