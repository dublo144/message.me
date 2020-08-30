const userResolver = require('./userResolver');
const channelResolver = require('./channelResolver');
const messageResolver = require('./messageResolver');
const conversationResolver = require('./conversationResolver');

module.exports = {
  Subscription: {
    ...messageResolver.subscriptions
  },
  Query: {
    ...userResolver.queries,
    ...channelResolver.queries,
    ...messageResolver.queries,
    ...conversationResolver.queries
  },
  Mutation: {
    ...userResolver.mutations,
    ...channelResolver.mutations,
    ...messageResolver.mutations,
    ...conversationResolver.mutations
  }
};
