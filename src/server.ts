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

export const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
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
