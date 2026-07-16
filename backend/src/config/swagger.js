import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Portfolio API', version: '1.0.0' },
  },
  apis: ['./src/routes/*.js'], // reads JSDoc comments from all route files
};

export default swaggerJsdoc(options);