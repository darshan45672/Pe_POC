'use client';

import { UseFormReturn } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { InfrastructureForm } from '@/lib/validations';
import { useState, useEffect } from 'react';

interface InfrastructureStepProps {
  form: UseFormReturn<InfrastructureForm>;
}

const infrastructureOptions = [
  { value: 'AKS', label: 'Azure Kubernetes Service (AKS)' },
  { value: 'EKS', label: 'Amazon Elastic Kubernetes Service (EKS)' },
  { value: 'GKE', label: 'Google Kubernetes Engine (GKE)' },
];

const regionOptions = {
  AKS: [
    { value: 'eastus', label: 'East US' },
    { value: 'westus2', label: 'West US 2' },
    { value: 'westeurope', label: 'West Europe' },
    { value: 'southeastasia', label: 'Southeast Asia' },
  ],
  EKS: [
    { value: 'us-east-1', label: 'US East (N. Virginia)' },
    { value: 'us-west-2', label: 'US West (Oregon)' },
    { value: 'eu-west-1', label: 'Europe (Ireland)' },
    { value: 'ap-southeast-1', label: 'Asia Pacific (Singapore)' },
  ],
  GKE: [
    { value: 'us-central1', label: 'US Central 1' },
    { value: 'us-west1', label: 'US West 1' },
    { value: 'europe-west1', label: 'Europe West 1' },
    { value: 'asia-southeast1', label: 'Asia Southeast 1' },
  ],
};

export function InfrastructureStep({ form }: InfrastructureStepProps) {
  const [selectedInfrastructure, setSelectedInfrastructure] = useState<string>('');

  const watchedType = form.watch('type');

  useEffect(() => {
    if (watchedType !== selectedInfrastructure) {
      setSelectedInfrastructure(watchedType);
      // Reset region when infrastructure type changes
      form.setValue('region', '');
    }
  }, [watchedType, selectedInfrastructure, form]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Infrastructure Configuration</h2>
        <p className="text-muted-foreground">
          Select your preferred infrastructure provider and configure the basic settings.
        </p>
      </div>

      <Form {...form}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Infrastructure Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select infrastructure type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {infrastructureOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {selectedInfrastructure && (
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Region</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {regionOptions[selectedInfrastructure as keyof typeof regionOptions]?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="clusterName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cluster Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter cluster name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Form>
    </div>
  );
}
