'use client';

import { Button } from '@/components/ui/button';
import { Building, User } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Building className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">InfraBuilder</span>
          </div>
          <Button variant="outline" size="sm">
            <User className="h-4 w-4 mr-2" />
            Sign In
          </Button>
        </div>
      </div>
    </nav>
  );
}
