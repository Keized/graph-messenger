import { useMutation, useQuery } from "@apollo/client";
import { createContext, Dispatch, ReactElement, SetStateAction, useEffect, useMemo, useState } from "react";
import {ALL_MESSAGES, GUEST_LOGIN_MUTATION, MESSAGE_MUTATION } from "../API";

export type User = {
    id: number;
}

export type Guest = {
    id: number;
    name: string;
}

export type AuthContextType = {
    guest: Guest | null;
    login: (guest: string) => Promise<void>;
    sendMessage: (messsage: string, guestId: number) => Promise<void>;
    messages: Message[];
}

export type LoginCheckResponse = {
    guest_login: {
        guest: Guest;
    }
}

export type SendMessageResponse = {
    createMessage: {
        author: Guest;
        content: string;
        createdAt: string;
        id: number;
    }
}

export type Message = {
    author: Guest;
    createdAt: string;
    id: number;
    content: string;
}

export type AllMessagesResponse = {
    allMessages: {
        author: Guest;
        createdAt: string;
        id: number;
        content: string;
    }
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactElement | ReactElement[] }) {

    const [guest, setGuest] = useState<Guest | null>(null);

    const [postLoginCheck] = useMutation<LoginCheckResponse, {name: string}>(GUEST_LOGIN_MUTATION);
    const [postMessage] = useMutation<SendMessageResponse, {content: string, guestId: number}>(MESSAGE_MUTATION);
    const { data, refetch } = useQuery<{allMessages: Message[]}>(ALL_MESSAGES);

    const sendMessage = async (message: string, guestId: number) => {
        await postMessage({ variables: { content: message, guestId } });
        refetch();
    }

    const login = async (name: string) => {
        const { data } = await postLoginCheck({variables: {name}});
        console.log(data);
        setGuest(data?.guest_login?.guest ?? null);
    };

    const value = useMemo(() => ({ guest, login, sendMessage, messages: data?.allMessages || [] }), [guest, data]);

    return (
        <AuthContext.Provider value={ value }>
            { children }
        </AuthContext.Provider>
    )
}
