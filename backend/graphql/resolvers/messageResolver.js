const ChannelModel = require('../../models/ChannelModel');
const {
  AuthenticationError,
  UserInputError
} = require('apollo-server-express');
const ConversationMessageModel = require('../../models/ConversationMessageModel');
const { transformChannelMessage } = require('./merge');
const ConversationModel = require('../../models/ConversationModel');
const MessageModel = require('../../models/MessageModel');

module.exports = {
  queries: {},
  mutations: {
    newMessage: async (_, { channelId, content }, { user }) => {
      try {
        if (!user) throw new AuthenticationError('Unauthenticated');

        const message = new MessageModel({
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
    newConversationMessage: async (
      _,
      { conversationId, content },
      { user }
    ) => {
      try {
        if (!user) throw new AuthenticationError('Unauthenticated');

        const savedUser = await UserModel.findById(user.userId);
        if (!savedUser) throw new UserInputError('User not found');

        const conversation = ConversationModel.findById(conversationId);
        if (!conversation) throw new UserInputError('Conversation not found');

        if (content.trim() === '') throw new UserInputError('Message empty');

        const message = new MessageModel({
          user: savedUser,
          date: new Date(),
          content,
          likes: 0,
          dislikes: 0
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
