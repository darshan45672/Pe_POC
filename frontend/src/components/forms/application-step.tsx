'use client';

import { UseFormReturn } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { ApplicationForm } from '@/lib/validations';

interface ApplicationStepProps {
  form: UseFormReturn<ApplicationForm>;
}

const applicationOptions = [
  { value: 'Java', label: 'Java' },
  { value: '.NET', label: '.NET' },
  { value: 'Node.js', label: 'Node.js' },
];

export function ApplicationStep({ form }: ApplicationStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Application Configuration</h2>
        <p className="text-muted-foreground">
          Configure your application settings including the runtime and deployment details.
        </p>
      </div>

      <Form {...form}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Application Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select application type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {applicationOptions.map((option) => (
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
            name="repoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repository URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://github.com/username/repository" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Container Image</FormLabel>
                <FormControl>
                  <Input placeholder="my-app:latest" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="port"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Port</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="8080" 
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || '')}
                  />
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
