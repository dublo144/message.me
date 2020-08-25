const { isAuthenticated } = require('../../helpers/isAuth');
const ChannelModel = require('../../models/ChannelModel');
const UserModel = require('../../models/UserModel');

module.exports = {
  queries: {
    channels: async (_, __, context) => {
      try {
        if (!context.user) throw new AuthenticationError('Unauthenticated');
        return await ChannelModel.find({ members: context.user.userId });
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    channelDetails: async (_, args, context) => {
      try {
        if (!context.user) throw new AuthenticationError('Unauthenticated');
        const channel = await ChannelModel.findOne({ _id: args.channelId });
        if (!channel) throw new Error('Channel does not exist');
        if (
          channel.members.filter(
            (member) => member.id === context.user.userId
          ) === 0
        )
          throw new Error('User is not a member of the channel');
        return channel;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  },
  mutations: {
    subscribeToChannel: async (_, args, context) => {
      try {
        if (!context.user) throw new AuthenticationError('Unauthenticated');

        const channel = await ChannelModel.findOne({ _id: args.channelId });
        if (!channel) throw new Error('Channel does not exist');

        const user = UserModel.findOne({ _id: context.user.userId });

        if (channel.members.find((user) => user.id === context.user.userId)) {
          throw new Error('User already subscribed to the channel');
        } else {
          channel.members.push(user);
          console.log(channel);
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    createChannel: async (_, args, context) => {
      try {
        // Are we authenticated?
        if (!context.user) throw new AuthenticationError('Unauthenticated');

        // Create Channel Mongoose Model
        const channel = new ChannelModel({
          name: args.ChannelInput.name,
          description: args.ChannelInput.description,
          admins: [context.user.userId],
          members: [...args.ChannelInput.members, context.user.userId]
        });
        const savedChannel = await channel.save();

        // Find the members
        const users = await UserModel.find({
          _id: { $in: [...args.ChannelInput.members, context.user.userId] }
        });
        // Add the channel to the members
        users.map((user) => {
          user.channels.push(savedChannel);
          user.save();
        });

        // Return the channel
        return savedChannel;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  }
};
