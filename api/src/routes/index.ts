import { Application } from 'express';

const registerRoutes = (server: Application) => {
  server.get('/', (_req, res) => {
    res.send('Hello from server');
  });
};

export default registerRoutes;
