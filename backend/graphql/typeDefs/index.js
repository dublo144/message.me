const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String
    channels: [Channel!]
  }

  input UserInput {
    firstName: String!
    lastName: String!
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

  type Channel {
    id: ID!
    name: String!
    description: String
    admins: [User!]!
    members: [User!]!
    messages: [Message!]!
  }

  input ChannelInput {
    name: String!
    description: String
    members: [ID!]
  }

  type Message {
    id: ID!
    user: User!
    content: String!
    date: String!
    likes: Int
    dislikes: Int
  }

  input MessageInput {
    channelId: ID!
    content: String!
  }

  type Query {
    users: [User!]!

    signIn(email: String!, password: String!): AuthData!

    channels: [Channel!]!
    channelDetails(channelId: String!): Channel!
  }

  type Mutation {
    signUp(UserInput: UserInput!): User!

    createChannel(ChannelInput: ChannelInput!): Channel!
    subscribeToChannel(channelId: String!): Channel!

    message(MessageInput: MessageInput!): Message!
  }
`;
