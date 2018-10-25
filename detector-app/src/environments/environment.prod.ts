export const environment = {
  production: true,
  detectorServiceHost: '192.168.0.201',
  detectorServicePort: 8001,
  detectorApiBasePath: '/api/v1',
  useDetectorApi: true,
  tfServingHost: 'http://detector-model-serving',
  tfServingPort: 8501,
  tfServingBasePath: '/v1/models',
  modelName: 'dog_breed',
  signature_name: 'serving_default',
  corsAnywhereHost: 'localhost',
  corsAnywherePort: 9501
};
