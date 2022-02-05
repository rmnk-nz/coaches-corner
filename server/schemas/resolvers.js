const { AuthenticationError } = require('apollo-server-express');
const { User, Admin, Program } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: () => {
            return Admin.find({}).populate('savedPrograms');
        },

        users: () => {
            return User.find({});
        },

        savedProgram: (root, { programId }) => {
            return Program.findOne({ _id: programId });
        },
        
        savedPrograms: () => {
          return Program.find({});
        }, 
    },

    Mutation: {
        loginAdmin: async (root, { email, password }) => {
            const admin = await Admin.findOne({ email: email });
      
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

        loginUser: async (root, { email, password }) => {
            const user = await User.findOne({ email: email });
      
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
        
        addUser: async (root, { email, password }) => {
          const user = await User.create({ email, password });
          const token = signToken(user);
        
          return { token, user };
        },

        addProgram: (root, { title, body }) => {
          return Program.create({ title: title, body: body });
        },

        removeProgram: (root, { title }) => {
          return Program.findOneAndDelete({ title: title });
        },
    },
};

module.exports = resolvers;