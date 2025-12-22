"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AiGif from "@/components/ai-gif";
import { Step1Details } from "./agent-steps/step-1-details";
import { Step2Content } from "./agent-steps/step-2-content";
import { Step3Tone } from "./agent-steps/step-3-tone";
import { Step4Language } from "./agent-steps/step-4-language";
import { Step5Confirmation } from "./agent-steps/step-5-confirmation";
import { cn } from "@/lib/utils";

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[80%] w-full p-0 overflow-hidden 
      h-[600px] flex flex-col md:flex-row gap-0"
      >
        {/* Left Panel */}
        <div className="w-full md:w-1/3 bg-muted/30 p-6 flex flex-col justify-between border-r">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">CharitySEO</span>
            </div>

            <div className="rounded-lg overflow-hidden border bg-background shadow-sm">
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
        <div className="flex-1 flex flex-col h-full">
          <div className="flex-1 p-8 overflow-y-auto">
            <CurrentStepComponent />
          </div>

          <div className="p-6 border-t bg-background flex justify-between items-center">
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
      </DialogContent>
    </Dialog>
  );
}
