import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket, MapPin, Calculator, FileText, Bell, User } from "lucide-react";
import LocationStep from "@/components/wizard/location-step";
import AreaStep from "@/components/wizard/area-step";
import MaterialsStep from "@/components/wizard/materials-step";
import ReviewStep from "@/components/wizard/review-step";
import ProgressIndicator from "@/components/wizard/progress-indicator";
import { useProposal } from "@/hooks/use-proposal";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const { proposalData, updateProposalData, resetProposal } = useProposal();

  const steps = [
    { id: 1, name: "Локація", component: LocationStep },
    { id: 2, name: "Площа", component: AreaStep },
    { id: 3, name: "Матеріали", component: MaterialsStep },
    { id: 4, name: "Огляд", component: ReviewStep },
  ];

  const startWizard = () => {
    setCurrentStep(1);
  };

  const goToWelcome = () => {
    setCurrentStep(0);
    resetProposal();
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getCurrentComponent = () => {
    const step = steps.find(s => s.id === currentStep);
    if (!step) return null;
    
    const Component = step.component;
    return (
      <Component
        data={proposalData}
        onUpdate={updateProposalData}
        onNext={nextStep}
        onPrevious={previousStep}
        onReset={goToWelcome}
      />
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'hsl(210, 40%, 98%)' }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 polibest-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">PoliBest</h1>
                <p className="text-xs text-gray-500 hidden sm:block">Конструктор пропозицій</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6 sm:max-w-2xl lg:max-w-4xl">
        {/* Welcome Section */}
        {currentStep === 0 && (
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto polibest-gradient rounded-full flex items-center justify-center mb-4">
                <FileText className="text-white w-12 h-12" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                🚀 Створюйте професійні пропозиції
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
                Швидко генеруйте комерційні пропозиції для полімерних покриттів PoliBest з автоматичними розрахунками та експортом у PDF
              </p>
            </div>
            
            <Button 
              onClick={startWizard}
              className="w-full sm:w-auto text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
              style={{ backgroundColor: 'hsl(347, 65%, 47%)' }}
            >
              <Rocket className="mr-2 h-5 w-5" />
              Почати створення пропозиції
            </Button>
            
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <Card>
                <CardContent className="p-4">
                  <MapPin className="mx-auto w-8 h-8 mb-2" style={{ color: 'hsl(347, 65%, 47%)' }} />
                  <h3 className="font-semibold text-gray-900">Локація</h3>
                  <p className="text-sm text-gray-600">Оберіть країну та місто</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <Calculator className="mx-auto w-8 h-8 mb-2" style={{ color: 'hsl(347, 65%, 47%)' }} />
                  <h3 className="font-semibold text-gray-900">Розрахунок</h3>
                  <p className="text-sm text-gray-600">Автоматичні калькуляції</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <FileText className="mx-auto w-8 h-8 mb-2" style={{ color: 'hsl(347, 65%, 47%)' }} />
                  <h3 className="font-semibold text-gray-900">Експорт</h3>
                  <p className="text-sm text-gray-600">Готова PDF пропозиція</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Progress Indicator */}
        {currentStep > 0 && (
          <ProgressIndicator currentStep={currentStep} steps={steps} />
        )}

        {/* Wizard Steps */}
        {currentStep > 0 && (
          <div className="animate-fade-in-up">
            {getCurrentComponent()}
          </div>
        )}
      </main>
    </div>
  );
}
