import { Application } from 'express';

import { middleware } from 'src/middleware';

const registerRoutes = (server: Application) => {
  server.get('/', (_req, res) => {
    res.send('Hello from server');
  });
};

export default registerRoutes;
