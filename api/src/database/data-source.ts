import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from './entities/User';

dotenv.config();

// export const AppDataSource = new DataSource({
//   type: 'mysql',
//   host: process.env.DB_HOST || '127.0.0.1',
//   port: Number(process.env.DB_PORT) || 3306,
//   username: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || '',
//   database: process.env.DB_DATABASE || 'api_db',
//   migrations: ['src/database/migrations/*.{js,ts}'],
//   logging: process.env.ORM_LOGGING === 'true',
//   entities: ['core/data/entity/**/*.{js,ts}'],
//   synchronize: false,
//   subscribers: []
// });

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'database',
  port: 3306,
  username: 'emir',
  password: 'test123',
  database: 'api_db',
  migrations: ['src/database/migrations/*.ts'],
  logging: true,
  entities: [User],
  synchronize: false,
  subscribers: []
});
