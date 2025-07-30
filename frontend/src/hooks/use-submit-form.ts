'use client';

import { useMutation } from '@tanstack/react-query';
import { FormData } from '@/lib/validations';

interface SubmitFormData {
  infrastructure: FormData['infrastructure'];
  application: FormData['application'];
  monitoring: FormData['monitoring'];
}

// Simulate API call
const submitForm = async (data: SubmitFormData): Promise<{ success: boolean; message: string }> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  // Simulate random success/failure for demo purposes
  // In a real app, this would be an actual API call
  const isSuccess = Math.random() > 0.1; // 90% success rate
  
  if (!isSuccess) {
    throw new Error('Failed to submit form. Please try again.');
  }
  
  return {
    success: true,
    message: 'Form submitted successfully!',
  };
};

export function useSubmitForm() {
  return useMutation({
    mutationFn: submitForm,
    onSuccess: (data) => {
      console.log('Form submitted successfully:', data);
    },
    onError: (error) => {
      console.error('Form submission failed:', error);
    },
  });
}
