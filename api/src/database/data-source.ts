import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'api_db',
  migrations: ['src/database/migrations/*.{js,ts}'],
  logging: process.env.ORM_LOGGING === 'true',
  entities: ['core/data/entity/**/*.{js,ts}'],
  synchronize: false,
  subscribers: []
});
