import { Application } from 'express';
import { generateSwaggerDocs } from 'src/swagger';

const registerRoutes = (server: Application) => {
  server.get('/', (_req, res) => {
    res.redirect('/api-docs');
  });

  generateSwaggerDocs(server);
};

export default registerRoutes;
