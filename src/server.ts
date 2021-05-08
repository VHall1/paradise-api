import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { __DEV__, __PROD__, __TEST__ } from './constants';
import { Bank } from './entities/Bank';
import { Character } from './entities/Character';
import { Custom } from './entities/Custom';
import { Survival } from './entities/Survival';
import { User } from './entities/User';
import { Vehicle } from './entities/Vehicle';
import { BankResolver } from './resolvers/bank';
import { CharacterResolver } from './resolvers/character';
import { CustomResolver } from './resolvers/custom';
import { SurvivalResolver } from './resolvers/survival';
import { UserResolver } from './resolvers/user';

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
    url: process.env.DATABASE_URL,
    synchronize: !__PROD__,
    logging: __DEV__,
    dropSchema: __TEST__,
    entities: [User, Character, Bank, Custom, Survival, Vehicle],
    migrations: [path.join(__dirname, './migrations/*')],
  });
  await conn.runMigrations();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        UserResolver,
        CharacterResolver,
        BankResolver,
        CustomResolver,
        SurvivalResolver,
      ],
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
