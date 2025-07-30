'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { InfrastructureForm, ApplicationForm, MonitoringForm } from '@/lib/validations';
import { Server, Code, Monitor } from 'lucide-react';

interface LivePreviewProps {
  infrastructure?: Partial<InfrastructureForm>;
  application?: Partial<ApplicationForm>;
  monitoring?: Partial<MonitoringForm>;
}

export function LivePreview({ infrastructure, application, monitoring }: LivePreviewProps) {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-lg">Configuration Preview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Server className="h-4 w-4 text-primary" />
            <h3 className="font-medium">Infrastructure</h3>
          </div>
          <div className="space-y-2 pl-6">
            {infrastructure?.type && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Type:</span>
                <Badge variant="secondary">{infrastructure.type}</Badge>
              </div>
            )}
            {infrastructure?.region && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Region:</span>
                <span className="text-sm">{infrastructure.region}</span>
              </div>
            )}
            {infrastructure?.clusterName && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Cluster:</span>
                <span className="text-sm">{infrastructure.clusterName}</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Code className="h-4 w-4 text-primary" />
            <h3 className="font-medium">Application</h3>
          </div>
          <div className="space-y-2 pl-6">
            {application?.type && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Type:</span>
                <Badge variant="secondary">{application.type}</Badge>
              </div>
            )}
            {application?.repoUrl && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Repository:</span>
                <span className="text-sm truncate max-w-32" title={application.repoUrl}>
                  {application.repoUrl}
                </span>
              </div>
            )}
            {application?.image && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Image:</span>
                <span className="text-sm">{application.image}</span>
              </div>
            )}
            {application?.port && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Port:</span>
                <span className="text-sm">{application.port}</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Monitor className="h-4 w-4 text-primary" />
            <h3 className="font-medium">Monitoring</h3>
          </div>
          <div className="space-y-2 pl-6">
            {monitoring?.type && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Type:</span>
                <Badge variant="secondary">{monitoring.type}</Badge>
              </div>
            )}
            {monitoring?.endpoint && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Endpoint:</span>
                <span className="text-sm truncate max-w-32" title={monitoring.endpoint}>
                  {monitoring.endpoint}
                </span>
              </div>
            )}
            {monitoring?.apiKey && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">API Key:</span>
                <span className="text-sm">••••••••</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
