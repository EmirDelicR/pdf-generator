import 'reflect-metadata';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

import { corsOptions } from 'src/config/cors';
import { middleware } from 'src/middleware';
import registerRoutes from 'src/routes';
import { createFileStream } from 'src/utils/file';
import Console from 'src/utils/logger';
import { AppDataSource } from 'src/database/data-source';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ debug: true });
}

const PORT: number = parseInt(process.env.PORT!, 10) || 3100;
const HOST: string = process.env.HOST! || 'localhost';

const server = express();

server.use(
  '/static',
  express.static(path.join(__dirname, '..', 'public/images'))
);
server.use(middleware.credentials);
server.use(cors(corsOptions));

server.use(
  morgan('combined', {
    stream: createFileStream(path.join(__dirname, '..', 'logs'), 'request.log')
  })
);
server.use(helmet());
server.use(express.json());
server.use(cookieParser());

registerRoutes(server);

server.use(middleware.error);

AppDataSource.initialize()
  .then(async () => {
    Console.info('Connection to database is establish.');
    server.listen(PORT, HOST, () => {
      Console.info(`Server running at http://${HOST}:${PORT}/`);
    });
  })
  .catch((err) => Console.error(`Error with db connection: ${err}`));
