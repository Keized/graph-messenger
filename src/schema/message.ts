import {Context} from "../context";

export const typeDef = `
    type Message {
        author: User!
        createdAt: DateTime!
        id: Int!
        content: String!
    }
    
    type Subscription {
        messageAdded(messageId: ID!): Message
    }
    
    extend type Query {
        allMessages: [Message!]!  
    }
    
    extend type Mutation {
        createMessage(content: String!): Message!
    }
`

export const resolvers = {
    Query: {
        allMessages: (_parent: undefined, _args: undefined, context: Context) => {
            return context.prisma.message.findMany();
        }
    },
    Mutation: {
        createMessage: (
            _parent: undefined,
            args: { content: string },
            context: Context
        ) => {
            const {userId, prisma} = context;
            const {content} = args;

            if (!userId) throw new Error("User must be authentified");

            const user = prisma.user.findUnique({
                where: {
                    id: userId
                }
            });

            if (!user) throw new Error("User not found");

            return prisma.message.create({
                data: {
                    content,
                    author: {
                        connect: {id: userId}
                    }
                }
            });
        },
    },
    Message: {
        author: (parent: { id: number }, _args: undefined, context: Context) => {
            return context.prisma.message
                .findUnique({
                    where: {id: parent?.id},
                })
                .author()
        },
    }
}
