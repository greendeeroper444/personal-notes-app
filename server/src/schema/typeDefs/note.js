const { gql } = require('apollo-server-express');

const noteTypeDefs = gql`
    type Note {
        id: ID!
        title: String!
        content: String!
        author: User!
        createdAt: String!
        updatedAt: String!
    }

    extend type Query {
        notes: [Note!]!
        note(id: ID!): Note
        myNotes: [Note!]!
    }

    extend type Mutation {
        createNote(title: String!, content: String!): Note!
        updateNote(id: ID!, title: String, content: String): Note!
        deleteNote(id: ID!): Boolean!
    }
`;

module.exports = noteTypeDefs;