const userResolvers = require('./user');
const noteResolvers = require('./note');
const queryResolvers = require('./query');
const mutationResolvers = require('./mutation');

module.exports = {
    Query: queryResolvers,
    Mutation: mutationResolvers,
    ...userResolvers,
    ...noteResolvers,
};