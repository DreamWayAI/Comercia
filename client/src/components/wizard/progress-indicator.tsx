import { Check } from "lucide-react";

interface Step {
  id: number;
  name: string;
}

interface ProgressIndicatorProps {
  currentStep: number;
  steps: Step[];
}

export default function ProgressIndicator({ currentStep, steps }: ProgressIndicatorProps) {
  const getStepClass = (stepId: number) => {
    if (stepId === currentStep) {
      return "step-active";
    } else if (stepId < currentStep) {
      return "step-completed";
    } else {
      return "step-inactive";
    }
  };

  const getProgressWidth = () => {
    if (currentStep <= 1) return "0%";
    return `${((currentStep - 1) / (steps.length - 1)) * 100}%`;
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${getStepClass(step.id)}`}>
              {step.id < currentStep ? (
                <Check className="w-4 h-4" />
              ) : (
                step.id
              )}
            </div>
            <span className={`text-sm font-medium transition-all duration-300 ${
              step.id < currentStep ? 'text-green-500' : 'text-gray-500'
            }`}
            style={step.id === currentStep ? { color: 'hsl(347, 65%, 47%)' } : {}}>
              {step.name}
            </span>
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 bg-gray-200 mx-4 min-w-[20px]">
                <div 
                  className="h-full transition-all duration-300"
                  style={{ 
                    backgroundColor: 'hsl(347, 65%, 47%)',
                    width: index < currentStep - 1 ? "100%" : index === currentStep - 1 ? "50%" : "0%" 
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
