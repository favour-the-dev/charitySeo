"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AiGif from "@/components/ai-gif";
import { Step1Details } from "./agent-steps/step-1-details";
import { Step2Content } from "./agent-steps/step-2-content";
import { Step3Tone } from "./agent-steps/step-3-tone";
import { Step4Language } from "./agent-steps/step-4-language";
import { Step5Confirmation } from "./agent-steps/step-5-confirmation";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface CreateAgentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const steps = [
  { id: 1, title: "Agent Details", component: Step1Details },
  { id: 2, title: "Universal Content", component: Step2Content },
  { id: 3, title: "Tone of Voice", component: Step3Tone },
  { id: 4, title: "Language & Variability", component: Step4Language },
  { id: 5, title: "Confirmation", component: Step5Confirmation },
];

export function CreateAgentModal({
  open,
  onOpenChange,
}: CreateAgentModalProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle creation logic here
      onOpenChange(false);
      setCurrentStep(1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 animate-in fade-in-0">
      <div
        className="absolute inset-0 bg-black/0"
        onClick={() => onOpenChange(false)}
      />
      <div className="bg-background w-[95%] md:w-[80%] h-[90%] md:h-[80%] rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row relative animate-in zoom-in-95 duration-200">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        {/* Left Panel */}
        <div className="w-full md:w-80 lg:w-96 bg-muted/30 p-4 md:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r shrink-0">
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">L</span>
              </div>
              <span className="font-bold text-lg">Localmator</span>
            </div>

            <div className="rounded-lg overflow-hidden border bg-background shadow-sm hidden md:block">
              <AiGif />
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Step {currentStep} of {steps.length}
              </p>
              <h3 className="text-xl font-bold text-primary">
                {steps[currentStep - 1].title}
              </h3>
            </div>
          </div>

          <div className="flex gap-1 mt-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors",
                  step.id <= currentStep ? "bg-primary" : "bg-muted"
                )}
              />
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 p-4 md:p-8 overflow-y-auto">
            <CurrentStepComponent />
          </div>

          <div className="p-4 md:p-6 border-t bg-background flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            <Button onClick={handleNext}>
              {currentStep === steps.length ? "Create Agent" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
