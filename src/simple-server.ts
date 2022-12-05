import { ApolloServer } from 'apollo-server'
import { context } from './context'
import { resolvers, typeDefs } from './schema'

new ApolloServer({ resolvers, typeDefs, context, introspection: true }).listen(
    { port: 4000 },
    () => console.log(`🚀 Server ready at: http://localhost:4000`)
)
