const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../../models/userModel');
const { AuthenticationError } = require('apollo-server-express');

module.exports = {
  queries: {
    users: async (_, __, context) => {
      try {
        if (context.req?.headers.authorization) {
          const token = context.req.headers.authorization.split('Bearer ')[1];
          jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
            if (err) throw new AuthenticationError('Unauthenticated');
          });
        }
        const users = await UserModel.find();
        return users;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    signIn: async (_, args) => {
      const { email, password } = args;

      const user = await UserModel.findOne({ email });
      if (!user) {
        // Todo - remove error log
        console.error('User not found');
        throw new Error('Invalid credentials');
      }
      const authenticated = await bcrypt.compare(password, user.password);
      if (!authenticated) {
        // Todo remove
        console.error('Invvalid password');
        throw new Error('Invalid credentials');
      }
      const token = jwt.sign(
        {
          userId: user.userId,
          username: user.username,
          email: user.email
        },
        process.env.SECRET,
        {
          expiresIn: '1h'
        }
      );
      return {
        username: user.username,
        userId: user.id,
        token,
        tokenExpiration: 1
      };
    }
  },
  mutations: {
    register: async (_, args) => {
      try {
        const existingUser = await UserModel.findOne({
          email: args.UserInput.email
        });
        if (existingUser) {
          throw new Error('User already exists');
        }

        const hashedPW = await bcrypt.hash(args.UserInput.password, 12);
        const user = new UserModel({
          username: args.UserInput.username,
          email: args.UserInput.email,
          password: hashedPW
        });

        const savedUser = await user.save();
        return { ...savedUser._doc, password: null, id: savedUser.id };
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  }
};
