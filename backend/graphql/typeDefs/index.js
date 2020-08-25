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
    channelMessages: [Message!]!
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

  type Conversation {
    id: ID!
    users: [User!]!
    name: String
    description: String
    messages: [Message!]!
  }

  type ConversationMessage {
    id: ID!
    user: User!
    content: String!
    date: String!
  }

  type Query {
    users: [User!]!

    signIn(email: String!, password: String!): AuthData!

    conversations: [Conversation!]!
    conversationDetails(conversationId: ID!): Conversation!

    channels: [Channel!]!
    channelDetails(channelId: ID!): Channel!
  }

  type Mutation {
    signUp(UserInput: UserInput!): User!

    createChannel(ChannelInput: ChannelInput!): Channel!
    subscribeToChannel(channelId: String!): Channel!
    newMessage(channelId: ID!, content: String!): Message!

    newConversation(
      recipientIds: [ID!]!
      name: String
      description: String
    ): Conversation!
  }
`;
