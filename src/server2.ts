// npm install @apollo/server express graphql cors body-parser
import { ApolloServer } from '@apollo/server';
import { context } from './context'
import { resolvers, typeDefs } from './schema'
import { createServer } from 'http';

import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { makeExecutableSchema } from 'graphql-tools';

interface MyContext {
  token?: String;
}


const PORT =  4000;

(async function() {

   // Create schema, which will be used separately by ApolloServer and
// the WebSocket server.
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create an Express app and HTTP server; we will attach the WebSocket
// server and the ApolloServer to this HTTP server.
const app = express();
const httpServer = createServer(app);

// Set up WebSocket server.
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});
const serverCleanup = useServer({ schema, context }, wsServer);

// Set up ApolloServer.
const server = new ApolloServer({
  resolvers, 
  typeDefs,

  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

await server.start();
//@ts-ignore
app.use('/graphql', cors<cors.CorsRequest>(), bodyParser.json(), expressMiddleware(server, { context }));

// Now that our HTTP server is fully set up, actually listen.
httpServer.listen(PORT, () => {
  console.log(`🚀 Query endpoint ready at http://localhost:${PORT}/graphql`);
  console.log(`🚀 Subscription endpoint ready at ws://localhost:${PORT}/graphql`);
});
})()