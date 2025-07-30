import * as yup from 'yup';

export const infrastructureSchema = yup.object({
  type: yup.string().required('Infrastructure type is required'),
  region: yup.string().required('Region is required'),
  clusterName: yup.string().required('Cluster name is required'),
});

export const applicationSchema = yup.object({
  type: yup.string().required('Application type is required'),
  repoUrl: yup.string().url('Must be a valid URL').required('Repository URL is required'),
  image: yup.string().required('Image is required'),
  port: yup.number().min(1, 'Port must be greater than 0').max(65535, 'Port must be less than 65536').required('Port is required'),
});

export const monitoringSchema = yup.object({
  type: yup.string().required('Monitoring type is required'),
  apiKey: yup.string().required('API key is required'),
  endpoint: yup.string().url('Must be a valid URL').required('Endpoint is required'),
});

export const formSchema = yup.object({
  infrastructure: infrastructureSchema,
  application: applicationSchema,
  monitoring: monitoringSchema,
});

export type InfrastructureForm = yup.InferType<typeof infrastructureSchema>;
export type ApplicationForm = yup.InferType<typeof applicationSchema>;
export type MonitoringForm = yup.InferType<typeof monitoringSchema>;
export type FormData = yup.InferType<typeof formSchema>;
