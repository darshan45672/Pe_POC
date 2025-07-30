'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from '@/components/layout/navbar';
import { MultiStepForm } from '@/components/forms/multi-step-form';
import { useState } from 'react';

export default function HomePage() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <div className="bg-gradient-to-b from-primary/5 to-background py-12">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                Infrastructure Configuration Wizard
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Deploy your applications to the cloud with our step-by-step configuration wizard.
                Set up infrastructure, applications, and monitoring in just a few clicks.
              </p>
            </div>
          </div>
          <MultiStepForm />
        </main>
      </div>
    </QueryClientProvider>
  );
}
