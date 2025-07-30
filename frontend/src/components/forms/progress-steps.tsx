'use client';

import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface ProgressStepsProps {
  currentStep: number;
  steps: Step[];
}

export function ProgressSteps({ currentStep, steps }: ProgressStepsProps) {
  const progress = ((currentStep) / steps.length) * 100;

  return (
    <div className="w-full space-y-4">
      <Progress value={progress} className="h-2" />
      <div className="flex justify-between">
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center space-y-2 flex-1"
          >
            <div className="flex items-center justify-center">
              {step.id < currentStep ? (
                <Badge variant="default" className="h-8 w-8 rounded-full p-0">
                  <Check className="h-4 w-4" />
                </Badge>
              ) : step.id === currentStep ? (
                <Badge variant="default" className="h-8 w-8 rounded-full p-0">
                  {step.id}
                </Badge>
              ) : (
                <Badge variant="outline" className="h-8 w-8 rounded-full p-0">
                  {step.id}
                </Badge>
              )}
            </div>
            <div className="text-center">
              <p className={`text-sm font-medium ${
                step.id <= currentStep ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {step.title}
              </p>
              <p className="text-xs text-muted-foreground hidden sm:block">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
