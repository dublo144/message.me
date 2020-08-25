const ChannelModel = require('../../models/ChannelModel');
const ChannelMessageModel = require('../../models/ChannelMessageModel');
const {
  AuthenticationError,
  UserInputError
} = require('apollo-server-express');
const ConversationMessageModel = require('../../models/ConversationMessageModel');
const { transformChannelMessage } = require('./merge');
const ConversationModel = require('../../models/ConversationModel');

module.exports = {
  queries: {},
  mutations: {
    channelMessage: async (_, { channelId, content }, { user }) => {
      try {
        if (!user) throw new AuthenticationError('Unauthenticated');

        const message = new ChannelMessageModel({
          user: user.userId,
          content: content,
          date: new Date(),
          likes: 0,
          dislikes: 0
        });

        const savedMessage = await message.save();

        const channel = await ChannelModel.findById(channelId);
        if (!channel) throw new Error('Channel does not exist');

        channel.channelMessages.push(savedMessage);
        channel.save();

        return transformChannelMessage(savedMessage);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    conversationMessage: async (_, { conversationId }, { user }) => {
      try {
        if (!user) throw new AuthenticationError('Unauthenticated');

        const conversation = ConversationModel.findById(conversationId);
        if (!conversation) throw new UserInputError('Conversation not found');

        if (content.trim() === '') throw new UserInputError('Message empty');

        const message = new ConversationMessageModel({
          date: new Date(),
          content
        });

        const savedMessage = await message.save();

        conversation.messages.push(savedMessage);
        await conversation.save();

        return savedMessage;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }
};
