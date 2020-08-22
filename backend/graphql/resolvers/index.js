const userResolver = require('./userResolver');
const channelResolver = require('./channelResolver');
const messageResolver = require('./messageResolver');

module.exports = {
  Query: {
    ...userResolver.queries,
    ...channelResolver.queries
  },
  Mutation: {
    ...userResolver.mutations,
    ...channelResolver.mutations,
    ...messageResolver.mutations
  }
};
