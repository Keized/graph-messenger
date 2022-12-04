import {Context} from "../context";
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();
export const typeDef = `
    type Message {
        author: Guest!
        createdAt: DateTime!
        id: Int!
        content: String!
    }
    
    type Subscription {
        messageAdded: Message!
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

            console.log(context);

            const guest = await prisma.guest.findUnique({
                where: {
                    id: parseInt(guestId)
                }
            });

            if (!guest) throw new Error("Guest not found");

            const message = await prisma.message.create({
                data: {
                    content,
                    author: {
                        connect: {id: parseInt(guestId)}
                    }
                }
            });

            pubsub.publish("messageAdded", {
                messageAdded: { ...message }
              });
  
            return message;

        },
    },
    Subscription: {
        messageAdded: {
            subscribe: () => pubsub.asyncIterator(["bookTitleChanged"])
        }
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
