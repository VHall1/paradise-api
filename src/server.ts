import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { routes } from './routes';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

// Load ENV variables
dotenv.config();

const main = async () => {
  const connection = await createConnection();

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
