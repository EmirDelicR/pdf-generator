import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';

import path from 'path';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ debug: true });
}

const PORT: number = parseInt(process.env.PORT!, 10) || 3100;
const HOST: string = process.env.HOST! || 'localhost';

const app = express();

app.use('/static', express.static(path.join(__dirname, 'images')));

app.use(cors());

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.listen(PORT, HOST, () => {
  console.info(`Server running at http://${HOST}:${PORT}/`);
});
