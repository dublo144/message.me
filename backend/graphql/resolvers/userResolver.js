const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../../models/UserModel');
const {
  AuthenticationError,
  UserInputError
} = require('apollo-server-express');
const { transformUser } = require('./merge');

module.exports = {
  queries: {
    users: async (_, __, { user }) => {
      try {
        if (!user) throw new AuthenticationError('Unauthenticated');
        const users = await UserModel.find();
        return users.map(transformUser);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    userData: async (_, __, { user }) => {
      try {
        if (!user) throw new AuthenticationError('Unauthenticated');

        const userData = await UserModel.findById(user.userId);
        if (!userData) throw new UserInputError('User does not exist');

        return transformUser(userData);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    signIn: async (_, args) => {
      const { email, password } = args;

      const user = await UserModel.findOne({ email });
      if (!user) {
        throw new Error('Invalid credentials');
      }
      const authenticated = await bcrypt.compare(password, user.password);
      if (!authenticated) {
        throw new Error('Invalid credentials');
      }
      const token = jwt.sign(
        {
          firstName: user.firstName,
          lastName: user.lastName,
          userId: user.id,
          username: user.username,
          email: user.email
        },
        process.env.SECRET
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
    signUp: async (_, args) => {
      try {
        const existingUser = await UserModel.findOne({
          email: args.UserInput.email
        });
        if (existingUser) {
          throw new Error('User already exists');
        }

        const hashedPW = await bcrypt.hash(args.UserInput.password, 12);
        const user = new UserModel({
          firstName: args.UserInput.firstName,
          lastName: args.UserInput.lastName,
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
