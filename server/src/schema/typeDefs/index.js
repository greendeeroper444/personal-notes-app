const { gql } = require('apollo-server-express');
const userTypeDefs = require('./user');
const noteTypeDefs = require('./note');

const rootTypeDefs = gql`
    type Query {
        _empty: String
    }
    
    type Mutation {
        _empty: String
    }
`;

module.exports = [rootTypeDefs, userTypeDefs, noteTypeDefs];