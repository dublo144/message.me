const userResolver = require('./userResolver');
const channelResolver = require('./channelResolver');

module.exports = {
  Query: {
    ...userResolver.queries,
    ...channelResolver.queries
  },
  Mutation: {
    ...userResolver.mutations,
    ...channelResolver.mutations
  }
};
