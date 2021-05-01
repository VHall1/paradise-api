import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import path from 'path';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { __PROD__ } from './constants';
import { buildSchema } from 'type-graphql';
import { User } from './entities/User';
import { HelloResolver } from './resolvers/hello';
import { Character } from './entities/Character';
import { UserResolver } from './resolvers/user';

const main = async () => {
  await createConnection({
    type: 'postgres',
    database: 'paradise',
    synchronize: !__PROD__,
    logging: !__PROD__,
    entities: [User, Character],
    migrations: [path.join(__dirname, './migrations/*')],
    dropSchema: process.env.NODE_ENV === 'test',
  });

  const app = express();

  app.use(
    cors({
      origin: 'http://localhost:30120',
      credentials: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver],
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
    if (process.env.NODE_ENV !== 'test')
      console.log(`🚀 Server started on port 4000`);
  });
};

main().catch((err) => console.error(err));
