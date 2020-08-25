const ChannelModel = require('../../models/ChannelModel');
const UserModel = require('../../models/UserModel');
const { transformChannel } = require('./merge');

module.exports = {
  queries: {
    channels: async (_, __, { user }) => {
      try {
        if (!user) throw new AuthenticationError('Unauthenticated');
        const channels = await ChannelModel.find({ members: user.userId });
        return channels.map(transformChannel);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    channelDetails: async (_, { channelId }, { user }) => {
      try {
        if (!user) throw new AuthenticationError('Unauthenticated');

        const channel = await ChannelModel.findById(channelId);
        if (!channel) throw new Error('Channel does not exist');

        if (channel.members.filter((member) => member.id === user.userId) === 0)
          throw new Error('User is not a member of the channel');

        return transformChannel(channel);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  },
  mutations: {
    subscribeToChannel: async (_, { channelId }, { user }) => {
      try {
        if (!context.user) throw new AuthenticationError('Unauthenticated');

        const channel = await ChannelModel.findById(channelId);
        if (!channel) throw new Error('Channel does not exist');

        const savedUser = UserModel.findById(user.userId);

        if (channel.members.find((user) => savedUser.id === user.userId)) {
          throw new Error('User already subscribed to the channel');
        }
        channel.members.push(savedUser);
        const savedChannel = await channel.save();
        return transformChannel(savedChannel);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    createChannel: async (_, args, { user }) => {
      try {
        // Are we authenticated?
        if (!user) throw new AuthenticationError('Unauthenticated');

        // Create Channel Mongoose Model
        const channel = new ChannelModel({
          name: args.ChannelInput.name,
          description: args.ChannelInput.description,
          admins: [user.userId],
          members: [...args.ChannelInput.members, user.userId]
        });
        const savedChannel = await channel.save();

        // Find the members
        const users = await UserModel.find({
          _id: { $in: [...args.ChannelInput.members, user.userId] }
        });
        // Add the channel to the members
        users.map(async (user) => {
          user.channels.push(savedChannel);
          await user.save();
        });

        // Return the channel
        return transformChannel(savedChannel);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  }
};
