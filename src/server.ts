import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { routes } from './routes';
import { createConnection } from 'typeorm';
import 'reflect-metadata';

// Load ENV variables
dotenv.config();

const main = async () => {
  if (
    !process.env.DB_HOST ||
    !process.env.DB_PORT ||
    !process.env.DB_USERNAME ||
    !process.env.DB_PASSWORD
  )
    throw new Error('At least one DB variable is missing from your .env file');

  const getEnviroment = () => {
    switch (process.env.NODE_ENV) {
      default:
        return 'paradise_development';
      case 'production':
        return 'paradise_production';
      case 'test':
        return 'paradise_test';
    }
  };

  await createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: getEnviroment(),
    synchronize: true,
    logging: false,
    entities: ['src/entities/**/*.ts'],
    migrations: ['src/migrations/**/*.ts'],
    subscribers: ['src/subscribers/**/*.ts'],
    dropSchema: process.env.NODE_ENV === 'test',
  });

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(routes);

  if (!process.env.PORT) throw new Error('No PORT set in .env');

  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server started on port ${process.env.PORT}`);
  });
};

main().catch((err) => console.error(err));
