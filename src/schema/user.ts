import {Context} from "../context";

export const typeDef = `
    extend type Query {
        allUsers: [User!]!
    }

    type User {
        email: String!
        id: Int!
        password: String!
        messages: [Message]
    }
`;

export const resolvers = {
    Query: {
        allUsers: (_parent: undefined, args: undefined, context: Context) => {
            return context.prisma.user.findMany();
        },
    }
}
