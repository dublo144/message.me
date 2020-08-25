const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../../models/UserModel');
const { AuthenticationError } = require('apollo-server-express');

module.exports = {
  queries: {
    users: async (_, __, context) => {
      try {
        if (!context?.user) throw new AuthenticationError('Unauthenticated');
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
