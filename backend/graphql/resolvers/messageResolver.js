const { isAuthenticated } = require('../../helpers/isAuth');
const ChannelModel = require('../../models/channelModel');
const MessageModel = require('../../models/messageModel');

module.exports = {
  queires: {},
  mutations: {
    message: async (_, args, context) => {
      try {
        const { userId } = isAuthenticated(context);

        const message = new MessageModel({
          user: userId,
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
    }
  }
};
