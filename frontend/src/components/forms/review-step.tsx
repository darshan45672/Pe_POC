'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { InfrastructureForm, ApplicationForm, MonitoringForm } from '@/lib/validations';
import { Server, Code, Monitor, CheckCircle } from 'lucide-react';

interface ReviewStepProps {
  infrastructure: InfrastructureForm;
  application: ApplicationForm;
  monitoring: MonitoringForm;
  isSubmitted?: boolean;
}

export function ReviewStep({ infrastructure, application, monitoring, isSubmitted }: ReviewStepProps) {
  if (isSubmitted) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          <h2 className="text-2xl font-semibold text-green-700">Submitted Successfully!</h2>
          <p className="text-muted-foreground">
            Your infrastructure configuration has been submitted and is waiting for approval.
          </p>
          <p className="text-sm text-muted-foreground">
            You will receive an email notification once the approval process is complete.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Review & Submit</h2>
        <p className="text-muted-foreground">
          Please review your configuration before submitting for approval.
        </p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Server className="h-5 w-5 text-primary" />
              <span>Infrastructure Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Type:</span>
              <Badge variant="secondary">{infrastructure.type}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Region:</span>
              <span className="text-sm">{infrastructure.region}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Cluster Name:</span>
              <span className="text-sm">{infrastructure.clusterName}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Code className="h-5 w-5 text-primary" />
              <span>Application Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Type:</span>
              <Badge variant="secondary">{application.type}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Repository:</span>
              <span className="text-sm truncate max-w-xs" title={application.repoUrl}>
                {application.repoUrl}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Image:</span>
              <span className="text-sm">{application.image}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Port:</span>
              <span className="text-sm">{application.port}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Monitor className="h-5 w-5 text-primary" />
              <span>Monitoring Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Type:</span>
              <Badge variant="secondary">{monitoring.type}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Endpoint:</span>
              <span className="text-sm truncate max-w-xs" title={monitoring.endpoint}>
                {monitoring.endpoint}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">API Key:</span>
              <span className="text-sm">••••••••••••</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
