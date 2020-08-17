const userResolver = require('./userResolver');

module.exports = {
  Query: {
    ...userResolver.queries
  },
  Mutation: {
    ...userResolver.mutations
  }
};
