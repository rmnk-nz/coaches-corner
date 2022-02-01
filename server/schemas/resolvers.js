const { AuthenticationError } = require('apollo-server-express');
const { User, Admin, Program } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async () => {
            return await Admin.find({}).populate('savedPrograms');
        },

        user: async () => {
            return await User.find({}).populate('savedPrograms');
        },

        savedProgram: async (root, { title }) => {
            return await Program.findOne({ title: title });
        },
        
        savedPrograms: async () => {
          return await Program.find({});
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

        addProgram: async (root, { title, body }) => {
          return await Program.create({ title: title, body: body });
        },

        removeProgram: async (root, { title }) => {
          return await Program.findOneAndDelete({ title: title });
        },
    },
};

module.exports = resolvers;