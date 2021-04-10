import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';

// Load ENV variables
dotenv.config();

const main = async () => {
  const app = express();

  // TypeORM
  await createConnection();

  app.use(cors());

  const apolloServer = new ApolloServer({});

  apolloServer.applyMiddleware({ app });

  if (!process.env.PORT) throw new Error('No PORT set in .env');

  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server started on port ${process.env.PORT}`);
  });
};

main().catch((err) => console.error(err));
