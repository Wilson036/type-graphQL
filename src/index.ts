import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import * as Express from 'express';
import { buildSchema, Query, Resolver } from 'type-graphql';

@Resolver()
class HelloResolver {
  @Query(() => String)
  async hello() {
    return 'hello world';
  }
}

const main = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });

  const applloServer = new ApolloServer({ schema });
  const app = Express();
  applloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('server started');
  });
};

main();
