const { AuthenticationError } = require('apollo-server-express');
const { User, Admin, Program } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.admin) {
              return Admin.findOne({ email: context.admin.email }).populate('savedPrograms');
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        user: async (parent, { email }) => {
            return User.findOne({ email }).populate('savedPrograms');
        },

        savedProgram: async (parent, { title }) => {
            return Program.findOne({ title: title });
        },
    },

    Mutation: {
        loginAdmin: async (parent, { email, password }) => {
            const admin = await Admin.findOne({ email });
      
            if (!admin) {
              throw new AuthenticationError('No user found with this email address');
            }
            
            const correctPw = await admin.isCorrectPassword(password);

            if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
        }
        const token = signToken(admin);
        return { token, admin };
        },

        addUser: async (parent, { email, password }) => {
            const user = await User.create({ email, password });
            const token = signToken(user);
            return { token, user };
        },

        loginUser: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('No user found with this email address');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
            return { token, user };
        },  

        addProgram: async (parent, { programData }, context) => {
            if (context.admin) {
              const programData = await Program.create({ title, body });
      
              await Admin.findOneAndUpdate(
                { email: context.admin.email },
                { $addToSet: { savedProgram: programData.title } },
                { new: true }
              );
      
              return programData ;
            }
        },

        removeProgram: async (parent, args, context) => {
            if (context.admin) {
              const programData = await Program.findOneAndDelete({
                title: args.title
              });
      
              await Admin.findOneAndUpdate(
                { email: context.admin.email },
                { $pull: { program: programData.title } }
              );
      
              return programData;
            }
        },
    },
};

module.exports = resolvers;