const { isAuthenticated } = require('../../helpers/isAuth');
const ChannelModel = require('../../models/ChannelModel');
const MessageModel = require('../../models/MessageModel');
const {
  AuthenticationError,
  UserInputError
} = require('apollo-server-express');
const UserModel = require('../../models/UserModel');
const PrivateMessageModel = require('../../models/PrivateMessageModel');

module.exports = {
  queries: {
    privateMessages: async (_, { fromUserId }, { user }) => {
      try {
        if (!user) throw new AuthenticationError('Unauthenticated');

        const otherUser = await UserModel.findOne({ _id: fromUserId });
        console.log(fromUserId);
        if (!otherUser) throw new UserInputError('Other user not found');

        const messages = await PrivateMessageModel.find({
          from: { $in: [fromUserId, user.userId] },
          to: { $in: [fromUserId, user.userId] }
        });
        console.log(messages);
        return messages;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  },
  mutations: {
    channelMessage: async (_, args, { user }) => {
      try {
        if (!user) throw new AuthenticationError('Unauthenticated');

        const message = new MessageModel({
          user: user.userId,
          content: args.MessageInput.content,
          date: new Date(),
          likes: 0,
          dislikes: 0
        });

        const savedMessage = await message.save();

        const channel = await ChannelModel.findOne({
          _id: args.MessageInput.channelId
        });
        if (!channel) throw new Error('Channel does not exist');

        channel.messages.push(savedMessage);
        channel.save();

        return savedMessage;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    privateMessage: async (_, { to, content }, { user }) => {
      try {
        if (!user) throw new AuthenticationError('Unauthenticated');

        const recipient = await UserModel.findOne({ _id: to });
        if (!recipient) throw new UserInputError('Recipient not found');

        if (content.trim() === '') throw new UserInputError('Message empty');

        const message = new PrivateMessageModel({
          from: user.userId,
          to: recipient._id,
          date: new Date(),
          content
        });
        return await message.save();
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }
};
