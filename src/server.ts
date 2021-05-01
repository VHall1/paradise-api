import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import path from 'path';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { __DEV__, __PROD__, __TEST__ } from './constants';
import { buildSchema } from 'type-graphql';
import { User } from './entities/User';
import { Character } from './entities/Character';
import { UserResolver } from './resolvers/user';
import dotenv from 'dotenv';

dotenv.config();

export const main = async () => {
  if (
    !process.env.DB_HOST ||
    !process.env.DB_PORT ||
    !process.env.DB_USERNAME ||
    !process.env.DB_PASSWORD
  )
    throw new Error('At least one DB variable is missing from your .env file');

  const conn = await createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: !__TEST__ ? 'paradise' : 'paradise_test',
    synchronize: !__PROD__,
    logging: __DEV__,
    dropSchema: __TEST__,
    entities: [User, Character],
    migrations: [path.join(__dirname, './migrations/*')],
  });
  await conn.runMigrations();

  const app = express();

  app.use(
    cors({
      origin: 'http://localhost:30120',
      credentials: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log(`🚀 Server started on port 4000`);
  });
};
