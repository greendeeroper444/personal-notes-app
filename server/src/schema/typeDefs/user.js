const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        notes: [Note!]!
        createdAt: String!
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    extend type Query {
        me: User
        users: [User!]!
    }

    extend type Mutation {
        register(username: String!, email: String!, password: String!): AuthPayload!
        login(email: String!, password: String!): AuthPayload!
    }
`;

module.exports = userTypeDefs;