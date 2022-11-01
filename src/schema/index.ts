import { merge } from 'lodash';
import { typeDef as Message, resolvers as messageResolvers } from './message';
import { typeDef as User, resolvers as userResolvers } from './user';
import { typeDef as Auth, resolvers as authResolvers } from './auth';

const Scalar = `
    scalar DateTime
`;

const Mutation = `
    type Mutation {
        _empty: String
    }   
`;

const Query = `
    type Query {
        _empty: String
    }
`;

export const typeDefs = [ Scalar, Query, Mutation, User, Message, Auth ];
export const resolvers = merge(messageResolvers, userResolvers, authResolvers);
