
import { ApolloServer } from "apollo-server";
const { makeExecutableSchema } = require('@graphql-tools/schema');
import models from './models';

import resolvers from './graphql/resolvers';
import typeDefs from './graphql/types';

import { $server } from "../config";



//Schema

const schema = makeExecutableSchema({
 typeDefs,
 resolvers
})


// Apollo Server

const apolloServer = new ApolloServer({
 schema,
 context: {
  models
 }
});

const alter = true;
const force = false;

models.sequelize.sync({ alter, force }).then(() => {
 apolloServer
  .listen($server.port)
  .then(({ url }) => {
   console.log(`Running on ${url}`)
  })
})