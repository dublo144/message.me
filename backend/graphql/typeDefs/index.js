const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String
    channels: [Channel!]!
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
    channelMessages: [ChannelMessage!]!
  }

  input ChannelInput {
    name: String!
    description: String
    members: [ID!]
  }

  type ChannelMessage {
    id: ID!
    user: User!
    content: String!
    date: String!
    likes: Int
    dislikes: Int
  }

  type Conversation {
    id: ID!
    users: [User!]!
    name: String
    description: String
    messages: [ConversationMessage!]!
  }

  type ConversationMessage {
    id: ID!
    user: ID!
    content: String!
    date: String!
  }

  type Query {
    users: [User!]!

    signIn(email: String!, password: String!): AuthData!

    conversations: [Conversation!]!
    conversation(conversationId: String!): Conversation!

    channels: [Channel!]!
    channelDetails(channelId: String!): Channel!
  }

  type Mutation {
    signUp(UserInput: UserInput!): User!

    createChannel(ChannelInput: ChannelInput!): Channel!
    subscribeToChannel(channelId: String!): Channel!
    channelMessage(channelId: ID!, content: String!): ChannelMessage!

    conversation(
      recipientIds: [ID!]!
      name: String
      description: String
    ): Conversation!
    conversationMessage(conversationId: ID!, content: String!): Conversation!
  }
`;
