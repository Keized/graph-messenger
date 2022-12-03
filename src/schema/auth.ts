import {context, Context} from "../context";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { APP_SECRET, EXPIRES_IN } from "../utils/auth";

export const typeDef = `
    input CreateUserInput {
        email: String!
        password: String!
    }

    input CreateGuestInput {
        name: String!
    }

    extend type Mutation {
        signup(email: String!, password: String!): AuthPayload!
        login(email: String!, password: String!): AuthPayload!
        guest_login(name: String!): GuestAuthPayload!
    }

    type AuthPayload {
        token: String!,
        user: User!
    }

    type GuestAuthPayload {
        guest: Guest!
    }
`;

export const resolvers = {
    Mutation: {
        signup: async (
            _parent: undefined,
            args: { password: string, email: string },
            context: Context
        ) => {
            const {email, password} = args;
            const existingUser = await context.prisma.user.findUnique({
                where: {email: args.email},
            });

            if (existingUser) {
                throw new Error("User already exists");
            }

            const hash = await bcrypt.hash(password, 10);
            const user = await context.prisma.user.create({
                data: {email, password: hash},
            });
            const token = jwt.sign({userId: user.id}, APP_SECRET);

            return {token, user};
        },
        login: async (
            _parent: undefined,
            args : { password: string, email:string },
            context: Context
        ) => {
            const {email, password} = args;

            const user = await context.prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                throw new Error('User not found');
            }

            const valid = await bcrypt.compare(
                password,
                user.password,
            );

            if (!valid) {
                throw new Error("Invalid password");
            }

            const token = jwt.sign({ userId: user.id }, APP_SECRET, { expiresIn: parseInt(EXPIRES_IN) });

            return {token, user};
        },
        guest_login: async(
            _parent: undefined,
            args: { name: string },
            context: Context
        ) => {
            const { name } = args;

            let guest = await context.prisma.guest.findFirst({
                where: { name }
            });

            if (!guest) {
               guest = await context.prisma.guest.create({ data: { name } }); 
            }

            return { guest };
        }
    }
}

