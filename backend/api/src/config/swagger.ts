import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HighWater Protocol API',
      version: '0.1.0',
      description: 'API documentation for the HighWater Protocol platform.'
    },
    servers: [
      {
        url: '/api/v1',
        description: 'Development server'
      }
    ]
  },
  apis: [
    './src/routes/*.ts'
  ]
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
