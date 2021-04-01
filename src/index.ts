import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { redis } from './redis';
import cors from 'cors';

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [__dirname + '/modules/**/*.ts'],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
  });

  const applloServer = new ApolloServer({
    schema,
    context: ({ req }: any) => ({ req }),
  });
  const app = Express();
  const RedisStore = connectRedis(session);
  app.use(
    cors({
      credentials: true,
      origin: 'https://localhost:3000',
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
      }),
      name: 'qid',
      secret: 'wilson036',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    })
  );
  applloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('server started');
  });
};

main();
