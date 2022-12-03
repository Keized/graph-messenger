import {Context} from "../context";

export const typeDef = `
    type Message {
        author: Guest!
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
        createMessage(content: String!, guestId: ID!): Message!
    }
`

export const resolvers = {
    Query: {
        allMessages: (_parent: undefined, _args: undefined, context: Context) => {
            return context.prisma.message.findMany();
        }
    },
    Mutation: {
        createMessage: async (
            _parent: undefined,
            args: { content: string, guestId: string },
            context: Context
        ) => {
            const { prisma } = context;
            const { content, guestId } = args;

            const guest = await prisma.guest.findUnique({
                where: {
                    id: parseInt(guestId)
                }
            });

            if (!guest) throw new Error("Guest not found");

            return await prisma.message.create({
                data: {
                    content,
                    author: {
                        connect: {id: parseInt(guestId)}
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
