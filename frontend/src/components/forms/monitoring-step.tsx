'use client';

import { UseFormReturn } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { MonitoringForm } from '@/lib/validations';

interface MonitoringStepProps {
  form: UseFormReturn<MonitoringForm>;
}

const monitoringOptions = [
  { value: 'Prometheus', label: 'Prometheus' },
  { value: 'Datadog', label: 'Datadog' },
];

export function MonitoringStep({ form }: MonitoringStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Monitoring Configuration</h2>
        <p className="text-muted-foreground">
          Set up monitoring and observability for your infrastructure and applications.
        </p>
      </div>

      <Form {...form}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monitoring Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select monitoring type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {monitoringOptions.map((option) => (
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

          <FormField
            control={form.control}
            name="apiKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>API Key</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter API key" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endpoint"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endpoint URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://api.monitoring-service.com" {...field} />
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
