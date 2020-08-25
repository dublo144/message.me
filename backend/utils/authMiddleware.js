const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

module.exports = (context) => {
  if (context.req?.headers.authorization) {
    const token = context.req.headers.authorization.split('Bearer ')[1];
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) throw new AuthenticationError('Invalid Token');
      context.user = decodedToken;
    });
  }
  return context;
};
