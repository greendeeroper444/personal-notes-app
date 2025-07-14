const { Note } = require('../../models');

const userResolvers = {
    User: {
        notes: async (parent) => {
            return await Note.find({ author: parent._id });
        },
    },
};

module.exports = userResolvers;