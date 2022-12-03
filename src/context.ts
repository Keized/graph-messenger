import { PrismaClient } from '@prisma/client'
import { decodeAuthorizationHeader } from "./utils/auth";
import { Request } from "express";

const publicOperations = ['login', 'signup'];

export interface Context {
    prisma: PrismaClient;
    userId?: number;
}

const prisma = new PrismaClient()

export const context = ({req}: { req: Request }): Context => {

    const match  = req.body.query.match('login|signup');
    if (match) {
        return { prisma };
    }

    //if (!req.headers.authorization) {
    //    throw new Error('Authorization headers not found');
    //}

    //const token = decodeAuthorizationHeader(req.headers.authorization);
    return {
        prisma,
    //    userId: token?.userId,
    };
}
