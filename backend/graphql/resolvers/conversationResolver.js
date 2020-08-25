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
          users: user.userId
        });
        return conversations.map(transformConversation);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    conversation: async (_, { conversationId }, { user }) => {
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
    conversation: async (_, { recipientIds, name, description }, { user }) => {
      try {
        if (!user) throw new AuthenticationError('Unauthenticated');

        // const existingConversation = await ConversationModel.find({
        //   users: [...recipientIds, user.userId]
        // });
        // if (existingConversation)
        //   throw new UserInputError('Conversation already exists');

        const filteredRecipientIds = recipientIds.filter(
          (r) => r !== user.userId
        );

        const recipients = await UserModel.find({
          _id: { $in: filteredRecipientIds }
        });
        if (!recipients) throw new Error('Recipients not found');

        if (!name) name = recipients.map((r) => r.firstName).join(', ');

        const conversation = new ConversationModel({
          name,
          description,
          users: [...recipients, user.userId],
          messages: []
        });
        const savedConversation = await conversation.save();

        return transformConversation(savedConversation);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  }
};
