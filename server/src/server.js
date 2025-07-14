require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const connectDB = require('./config/database');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');
const { verifyToken } = require('./utils/jwt');

async function startServer() {

    //connect to MongoDB
    await connectDB();

    const app = express();
  
    app.use(cors());
    
    //Apollo Server
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {

        //get token from headers
        const token = req.headers.authorization?.replace('Bearer ', '');
        let user = null;
        
        if (token) {
            try {
                user = verifyToken(token);
            } catch (error) {
                console.log('Invalid token:', error.message);
            }
        }
        
        return { user };
        },

        //enable graphql palyground
        introspection: true,
        playground: true,
    });

    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
        console.log(`GraphQL Playground: http://localhost:${PORT}${server.graphqlPath}`);
    });
}

startServer().catch(error => {
    console.error('Error starting server:', error);
});