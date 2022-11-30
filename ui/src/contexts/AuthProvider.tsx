import { useMutation, useQuery } from "@apollo/client";
import { createContext, Dispatch, ReactElement, SetStateAction, useEffect, useMemo, useState } from "react";
import {ALL_MESSAGES, LOGIN_MUTATION, MESSAGE_MUTATION } from "../API";

export type User = {
    id: number;
}

export type AuthContextType = {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    sendMessage: (messsage: string) => Promise<void>;
    messages: Message[];
}

export type LoginCheckResponse = {
    login: {
        user: User,
        token: string
    }
}

export type SendMessageResponse = {
    createMessage: {
        author: {
            id: number;
        };
        content: string;
        createdAt: string;
        id: number;
    }
}

export type Message = {
    author: {
        email: string;
        id: string;
    };
    createdAt: string;
    id: number;
    content: string;
}

export type AllMessagesResponse = {
    allMessages: {
        author: {
            email: string;
            id: string;
        };
        createdAt: string;
        id: number;
        content: string;
    }
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactElement | ReactElement[] }) {
    const token = localStorage.getItem('token');

    const [user, setUser] = useState<User | null>(null);
    const headers = {Authorization: `Bearer ${token}`}

    const [postLoginCheck] = useMutation<LoginCheckResponse, {email: string, password: string}>(LOGIN_MUTATION);
    const [postMessage] = useMutation<SendMessageResponse, {content: string}>(MESSAGE_MUTATION, { context: { headers }});
    const { data, refetch } = useQuery<{allMessages: Message[]}>(ALL_MESSAGES, { context: { headers }});

    const sendMessage = async (message: string) => {
        await postMessage({ variables: { content: message } });
        refetch();
    }

    const login = async (email: string, password: string) => {
        const { data } = await postLoginCheck({variables: {email, password}});
        setUser(data?.login?.user ?? null);
        localStorage.setItem('token', data?.login.token ?? '')
    };

    const value = useMemo(() => ({ user, login, sendMessage, messages: data?.allMessages || [] }), [user, data]);

    return (
        <AuthContext.Provider value={ value }>
            { children }
        </AuthContext.Provider>
    )
}
