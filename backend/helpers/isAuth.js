const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

module.exports = {
  isAuthenticated: (context) => {
    if (context.req?.headers.authorization) {
      const token = context.req.headers.authorization.split('Bearer ')[1];
      return jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
        if (err) throw new AuthenticationError('Invalid Token');
        return decodedToken;
      });
    } else {
      throw new AuthenticationError('Unauthenticated');
    }
  }
};
