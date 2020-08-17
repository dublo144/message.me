const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');

const server = new ApolloServer({ typeDefs, resolvers, context: (ctx) => ctx });

const app = express();

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, x-access-token'
  );
  next();
});

server.applyMiddleware({ app });

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@cluster0-wabpp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() =>
    app.listen({ port: 4000 }, () =>
      console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
      )
    )
  )
  .catch((e) => console.log(e));
