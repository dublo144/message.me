const ChannelModel = require('../../models/ChannelModel');
const UserModel = require('../../models/UserModel');
const ChannelMessageModel = require('../../models/ChannelMessageModel');
const ConversationModel = require('../../models/ConversationModel');
const ConversationMessageModel = require('../../models/ConversationMessageModel');

const channel = async (channelId) => {
  try {
    const channel = await ChannelModel.findById(channelId);
    return transformChannel(channel);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const channels = async (channelIds) => {
  try {
    const channels = await ChannelModel.find({ _id: { $in: channelIds } });
    return channels.map(transformChannel);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const channelMessages = async (messageIds) => {
  try {
    const messages = await ChannelMessageModel.find({
      _id: { $in: messageIds }
    });
    return messages.map(transformChannelMessage);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const user = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
    return transformUser(user);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const users = async (userIds) => {
  try {
    const users = await UserModel.find({ _id: { $in: userIds } });
    return users.map(transformUser);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const conversations = async (conversationIds) => {
  try {
    const conversations = await ConversationModel.find({
      _id: { $in: conversationIds }
    });
    return conversations.map(transformConversation);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const conversationMessages = async (messageIds) => {
  try {
    const messages = await ConversationMessageModel.find({
      _id: { $in: messageIds }
    });
    return messages.map(transformConversationMessage);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const transformUser = (user) => {
  return {
    ...user._doc,
    id: user.id,
    channels: channels.bind(this, user.channels)
  };
};

const transformChannelMessage = (message) => {
  console.log(message);
  return {
    ...message._doc,
    id: message.id,
    user: user.bind(this, message.user)
  };
};

const transformChannel = (channel) => {
  return {
    ...channel._doc,
    id: channel.id,
    admins: users.bind(this, channel.admins),
    members: users.bind(this, channel.members),
    channelMessages: channelMessages.bind(this, channel.channelMessages)
  };
};

const transformConversation = (conversation) => {
  return {
    ...conversation._doc,
    id: conversation.id,
    users: users.bind(this, conversation.users),
    messages: conversationMessages.bind(this, conversation.messages)
  };
};

const transformConversationMessage = (message) => {
  return {
    ...message._doc,
    id: message.id,
    user: user.bind(this, message.user)
  };
};

module.exports = {
  transformUser,
  transformChannel,
  transformChannelMessage,
  transformConversation,
  transformConversationMessage
};
