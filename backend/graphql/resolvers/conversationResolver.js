const {
  AuthenticationError,
  UserInputError
} = require('apollo-server-express');
const ConversationModel = require('../../models/ConversationModel');
const { transformConversation } = require('./merge');
const UserModel = require('../../models/UserModel');

module.exports = {
  queries: {
    conversations: async (_, __, { user }) => {
      try {
        if (!user) throw new AuthenticationError('Unauthenticated');
        const conversations = await ConversationModel.find({
          members: user.userId
        });
        return conversations.map(transformConversation);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    conversationDetails: async (_, { conversationId }, { user }) => {
      try {
        if (!user) throw new AuthenticationError('Unauthenticated');

        const conversation = await ConversationModel.findById(conversationId);
        if (!conversation) throw new UserInputError('Conversation not found');

        return transformConversation(conversation);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  },
  mutations: {
    newConversation: async (_, { memberIds, name, description }, { user }) => {
      try {
        if (!user) throw new AuthenticationError('Unauthenticated');

        // const existingConversation = await ConversationModel.find({
        //   users: [...recipientIds, user.userId]
        // });
        // if (existingConversation)
        //   throw new UserInputError('Conversation already exists');

        memberIds = [...new Set([...memberIds, user.userId])];

        const members = await UserModel.find({
          _id: { $in: memberIds }
        });
        if (!members) throw new Error('Recipients not found');

        if (!name) name = members.map((r) => r.firstName).join(', ');

        const conversation = new ConversationModel({
          name,
          description,
          members: members,
          messages: []
        });
        const savedConversation = await conversation.save();

        members.map(async (m) => {
          m.conversations.push(savedConversation);
          await m.save();
        });

        return transformConversation(savedConversation);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  }
};
