const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  type AuthData {
    username: String!
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  type Query {
    users: [User]!
    signIn(email: String!, password: String!): AuthData!
  }

  type Mutation {
    register(UserInput: UserInput): User!
  }
`;
