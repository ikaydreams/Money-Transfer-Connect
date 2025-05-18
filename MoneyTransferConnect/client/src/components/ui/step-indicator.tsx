import { cn } from "@/lib/utils";

interface Step {
  id: number;
  name: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="relative step-indicator bg-neutral-200 px-4 py-4 flex justify-between">
      {steps.map((step) => (
        <div key={step.id} className="flex flex-col items-center z-10">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center font-medium mb-1",
              step.id <= currentStep
                ? "bg-primary text-white"
                : "bg-neutral-200 text-neutral-800"
            )}
          >
            {step.id}
          </div>
          <span className="text-xs sm:text-sm font-medium">{step.name}</span>
        </div>
      ))}
    </div>
  );
}
