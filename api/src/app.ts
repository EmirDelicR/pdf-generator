import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import path from 'path';

import Console from 'src/utils/logger';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ debug: true });
}

const PORT: number = parseInt(process.env.PORT!, 10) || 3100;
const HOST: string = process.env.HOST! || 'localhost';

const server = express();

server.use('/static', express.static(path.join(__dirname, 'images')));

server.use(cors());

server.use(helmet());
server.use(express.json());
server.use(cookieParser());

server.listen(PORT, HOST, () => {
  Console.info(`Server running at http://${HOST}:${PORT}/`);
});
