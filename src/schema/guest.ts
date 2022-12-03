import {Context} from "../context";

export const typeDef = `
    extend type Query {
        allGuests: [Guest!]!
    }

    type Guest {
        id: ID!
        name: String!
        messages: [Message]
    }
`;

export const resolvers = {
    Query: {
        allGuests: (_parent: undefined, args: undefined, context: Context) => {
            return context.prisma.guest.findMany();
        },
    }
}
