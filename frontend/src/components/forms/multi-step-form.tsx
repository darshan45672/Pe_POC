'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, ArrowLeft, ArrowRight } from 'lucide-react';
import { ProgressSteps } from './progress-steps';
import { LivePreview } from './live-preview';
import { InfrastructureStep } from './infrastructure-step';
import { ApplicationStep } from './application-step';
import { MonitoringStep } from './monitoring-step';
import { ReviewStep } from './review-step';
import { 
  infrastructureSchema, 
  applicationSchema, 
  monitoringSchema,
  InfrastructureForm,
  ApplicationForm,
  MonitoringForm
} from '@/lib/validations';
import { useSubmitForm } from '@/hooks/use-submit-form';

const steps = [
  { id: 1, title: 'Infrastructure', description: 'Configure your infrastructure' },
  { id: 2, title: 'Application', description: 'Set up your application' },
  { id: 3, title: 'Monitoring', description: 'Configure monitoring' },
  { id: 4, title: 'Review', description: 'Review and submit' },
];

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<{
    infrastructure?: InfrastructureForm;
    application?: ApplicationForm;
    monitoring?: MonitoringForm;
  }>({});

  const submitMutation = useSubmitForm();

  const infrastructureForm = useForm<InfrastructureForm>({
    resolver: yupResolver(infrastructureSchema),
    mode: 'onChange',
    defaultValues: formData.infrastructure || {},
  });

  const applicationForm = useForm<ApplicationForm>({
    resolver: yupResolver(applicationSchema),
    mode: 'onChange',
    defaultValues: formData.application || {},
  });

  const monitoringForm = useForm<MonitoringForm>({
    resolver: yupResolver(monitoringSchema),
    mode: 'onChange',
    defaultValues: formData.monitoring || {},
  });

  const getCurrentFormValidation = () => {
    switch (currentStep) {
      case 1:
        return infrastructureForm.formState.isValid;
      case 2:
        return applicationForm.formState.isValid;
      case 3:
        return monitoringForm.formState.isValid;
      case 4:
        return true; // Review step is always valid
      default:
        return false;
    }
  };

  const handleNext = async () => {
    let isValid = false;

    switch (currentStep) {
      case 1:
        isValid = await infrastructureForm.trigger();
        if (isValid) {
          const data = infrastructureForm.getValues();
          setFormData(prev => ({ ...prev, infrastructure: data }));
        }
        break;
      case 2:
        isValid = await applicationForm.trigger();
        if (isValid) {
          const data = applicationForm.getValues();
          setFormData(prev => ({ ...prev, application: data }));
        }
        break;
      case 3:
        isValid = await monitoringForm.trigger();
        if (isValid) {
          const data = monitoringForm.getValues();
          setFormData(prev => ({ ...prev, monitoring: data }));
        }
        break;
      case 4:
        // Submit form
        if (formData.infrastructure && formData.application && formData.monitoring) {
          submitMutation.mutate({
            infrastructure: formData.infrastructure,
            application: formData.application,
            monitoring: formData.monitoring,
          }, {
            onSuccess: () => {
              setIsSubmitted(true);
            },
          });
        }
        return;
      default:
        return;
    }

    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <InfrastructureStep form={infrastructureForm} />;
      case 2:
        return <ApplicationStep form={applicationForm} />;
      case 3:
        return <MonitoringStep form={monitoringForm} />;
      case 4:
        return (
          <ReviewStep
            infrastructure={formData.infrastructure!}
            application={formData.application!}
            monitoring={formData.monitoring!}
            isSubmitted={isSubmitted}
          />
        );
      default:
        return null;
    }
  };

  // Collect current form values for live preview
  const infrastructureValues = infrastructureForm.watch();
  const applicationValues = applicationForm.watch();
  const monitoringValues = monitoringForm.watch();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <ProgressSteps currentStep={currentStep} steps={steps} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              {renderCurrentStep()}
              
              {!isSubmitted && (
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  <Button
                    onClick={handleNext}
                    disabled={!getCurrentFormValidation() || submitMutation.isPending}
                  >
                    {submitMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : currentStep === 4 ? (
                      'Submit'
                    ) : (
                      <>
                        Next
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <LivePreview
              infrastructure={currentStep >= 1 ? { ...formData.infrastructure, ...infrastructureValues } : undefined}
              application={currentStep >= 2 ? { ...formData.application, ...applicationValues } : undefined}
              monitoring={currentStep >= 3 ? { ...formData.monitoring, ...monitoringValues } : undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
