import { Application } from 'express';
import swaggerUi from 'swagger-ui-express';

import { ISwaggerMainDocument } from 'src/interfaces/swagger';

import { autoLogin, login, register } from 'src/swagger/routes/auth';
import { getUser, updateUser } from 'src/swagger/routes/user';

const { PORT, HOST } = process.env;

const swaggerDocument: ISwaggerMainDocument = {
  openapi: '3.0.0',
  info: {
    description: 'API Documentation for NodeJS API project',
    version: '1.0.0',
    title: 'NODE API',
    contact: {
      email: 'test@test.com'
    },
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
    }
  },
  servers: [
    {
      url: `http://${HOST || 'localhost'}:${PORT || 3100}/`,
      description: 'Local server'
    }
  ],
  paths: {
    '/login': {
      post: login
    },
    '/autoLogin': {
      post: autoLogin
    },
    '/register': {
      post: register
    },
    '/user/{id}': {
      get: getUser,
      patch: updateUser
    }
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ],
  tags: [
    {
      name: 'Auth'
    },
    {
      name: 'User'
    }
  ]
};

export const generateSwaggerDocs = (app: Application) => {
  // Swagger Page
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Documentation in JSON format
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocument);
  });
};
