const { User } = require('../../models');

const noteResolvers = {
    Note: {
        author: async (parent) => {
            return await User.findById(parent.author);
        },
    },
};

module.exports = noteResolvers;