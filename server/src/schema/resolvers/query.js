const { User, Note } = require('../../models');
const { AuthenticationError } = require('apollo-server-express');

const queryResolvers = {
    //user queries
    me: async (_, __, { user }) => {
        if (!user) {
            throw new AuthenticationError('You must be logged in');
        }
        return await User.findById(user.id);
    },
    
    users: async () => {
        return await User.find({});
    },
    
    //note queries
    notes: async () => {
        return await Note.find({}).populate('author');
    },
    
    note: async (_, { id }) => {
        const note = await Note.findById(id).populate('author');
        if (!note) {
            throw new Error('Note not found');
        }
        return note;
    },
    
    myNotes: async (_, __, { user }) => {
        if (!user) {
            throw new AuthenticationError('You must be logged in');
        }
        return await Note.find({ author: user.id }).populate('author');
    },
};

module.exports = queryResolvers;