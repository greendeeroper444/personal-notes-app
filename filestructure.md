# Personal Notes App - File Structure

## Project Root
```
personal-notes-app/
├── backend/
├── frontend/
├── shared/
├── .gitignore
├── README.md
├── package.json
└── docker-compose.yml
```

## Backend Structure (Node.js + GraphQL)
```
backend/
├── src/
│   ├── schema/
│   │   ├── index.js
│   │   ├── typeDefs/
│   │   │   ├── user.js
│   │   │   ├── note.js
│   │   │   └── index.js
│   │   └── resolvers/
│   │       ├── user.js
│   │       ├── note.js
│   │       ├── mutation.js
│   │       ├── query.js
│   │       └── index.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Note.js
│   │   └── index.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   └── errorHandler.js
│   ├── utils/
│   │   ├── database.js
│   │   ├── jwt.js
│   │   ├── validation.js
│   │   └── constants.js
│   ├── config/
│   │   ├── database.js
│   │   ├── server.js
│   │   └── environment.js
│   └── server.js
├── tests/
│   ├── resolvers/
│   │   ├── user.test.js
│   │   └── note.test.js
│   ├── models/
│   │   ├── User.test.js
│   │   └── Note.test.js
│   └── utils/
│       └── testHelpers.js
├── .env
├── .env.example
├── package.json
├── nodemon.json
└── jest.config.js
```

## Frontend Structure (React + Apollo Client)
```
frontend/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.js
│   │   │   ├── Loading.js
│   │   │   ├── ErrorMessage.js
│   │   │   └── Button.js
│   │   ├── auth/
│   │   │   ├── LoginForm.js
│   │   │   ├── RegisterForm.js
│   │   │   └── AuthGuard.js
│   │   └── notes/
│   │       ├── NoteList.js
│   │       ├── NoteCard.js
│   │       ├── NoteForm.js
│   │       ├── NoteEditor.js
│   │       └── NoteSearch.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Dashboard.js
│   │   └── NotFound.js
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useNotes.js
│   │   └── useLocalStorage.js
│   ├── graphql/
│   │   ├── queries/
│   │   │   ├── userQueries.js
│   │   │   └── noteQueries.js
│   │   ├── mutations/
│   │   │   ├── userMutations.js
│   │   │   └── noteMutations.js
│   │   └── fragments/
│   │       ├── userFragments.js
│   │       └── noteFragments.js
│   ├── utils/
│   │   ├── apolloClient.js
│   │   ├── auth.js
│   │   ├── constants.js
│   │   └── helpers.js
│   ├── styles/
│   │   ├── globals.css
│   │   ├── components/
│   │   │   ├── Header.css
│   │   │   ├── NoteCard.css
│   │   │   └── NoteForm.css
│   │   └── pages/
│   │       ├── Home.css
│   │       └── Dashboard.css
│   ├── contexts/
│   │   ├── AuthContext.js
│   │   └── ThemeContext.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── tests/
│   ├── components/
│   │   ├── NoteList.test.js
│   │   └── NoteForm.test.js
│   ├── pages/
│   │   └── Dashboard.test.js
│   ├── hooks/
│   │   └── useAuth.test.js
│   └── utils/
│       └── testHelpers.js
├── .env
├── .env.example
├── package.json
└── jest.config.js
```

## Shared Directory
```
shared/
├── types/
│   ├── user.js
│   ├── note.js
│   └── index.js
├── constants/
│   ├── errors.js
│   ├── statuses.js
│   └── index.js
└── validators/
    ├── user.js
    ├── note.js
    └── index.js
```

## Key File Purposes

### Backend Key Files:
- **`src/schema/typeDefs/`**: GraphQL schema definitions
- **`src/schema/resolvers/`**: GraphQL resolvers for queries and mutations
- **`src/models/`**: Database models (User, Note)
- **`src/middleware/auth.js`**: Authentication middleware
- **`src/utils/database.js`**: Database connection and utilities
- **`src/server.js`**: Main server file with Apollo Server setup

### Frontend Key Files:
- **`src/utils/apolloClient.js`**: Apollo Client configuration
- **`src/graphql/queries/`**: GraphQL queries
- **`src/graphql/mutations/`**: GraphQL mutations
- **`src/components/notes/`**: Note-related components
- **`src/hooks/useAuth.js`**: Authentication hook
- **`src/contexts/AuthContext.js`**: Authentication context

### Example GraphQL Schema Structure:
```graphql
# typeDefs/user.js
type User {
  id: ID!
  username: String!
  email: String!
  notes: [Note!]!
  createdAt: String!
  updatedAt: String!
}

# typeDefs/note.js
type Note {
  id: ID!
  title: String!
  content: String!
  author: User!
  createdAt: String!
  updatedAt: String!
}

# Main queries and mutations
type Query {
  me: User
  notes: [Note!]!
  note(id: ID!): Note
}

type Mutation {
  register(username: String!, email: String!, password: String!): AuthPayload!
  login(email: String!, password: String!): AuthPayload!
  createNote(title: String!, content: String!): Note!
  updateNote(id: ID!, title: String, content: String): Note!
  deleteNote(id: ID!): Boolean!
}
```

## Technology Stack:
- **Backend**: Node.js, Apollo Server, GraphQL, MongoDB/PostgreSQL
- **Frontend**: React, Apollo Client, React Router
- **Authentication**: JWT tokens
- **Testing**: Jest, React Testing Library
- **Styling**: CSS Modules or Styled Components

This structure provides a solid foundation for building a scalable Personal Notes App with GraphQL, making it easy to implement CRUD operations and maintain clean separation of concerns.