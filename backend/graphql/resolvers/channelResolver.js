const { isAuthenticated } = require('../../helpers/isAuth');
const ChannelModel = require('../../models/channelModel');
const UserModel = require('../../models/userModel');

module.exports = {
  queries: {
    channels: async (_, __, context) => {
      try {
        const { userId } = isAuthenticated(context);
        return await ChannelModel.find({ members: userId });
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    channelDetails: async (_, args, context) => {
      try {
        const { userId } = isAuthenticated(context);
        const channel = await ChannelModel.findOne({ _id: args.channelId });
        if (!channel) throw new Error('Channel does not exist');
        if (channel.members.filter((member) => member.id === userId) === 0)
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
        const { userId } = isAuthenticated(context);

        const channel = await ChannelModel.findOne({ _id: args.channelId });
        if (!channel) throw new Error('Channel does not exist');

        const user = UserModel.findOne({ _id: userId });

        if (channel.members.find((user) => user.id === userId)) {
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
        const { userId } = isAuthenticated(context);

        // Create Channel Mongoose Model
        const channel = new ChannelModel({
          name: args.ChannelInput.name,
          description: args.ChannelInput.description,
          admins: [userId],
          members: [...args.ChannelInput.members, userId]
        });
        const savedChannel = await channel.save();

        // Find the members
        const users = await UserModel.find({
          _id: { $in: [...args.ChannelInput.members, userId] }
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
