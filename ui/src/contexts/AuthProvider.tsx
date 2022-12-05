import { useMutation, useQuery } from "@apollo/client";
import { createContext, Dispatch, ReactElement, SetStateAction, useEffect, useMemo, useState } from "react";
import {ALL_MESSAGES, GUEST_LOGIN_MUTATION, MESSAGES_SUBSCRIPTION, MESSAGE_MUTATION } from "../API";
import { useSubscription } from "@apollo/client";

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
    const { data: subData, loading } = useSubscription(MESSAGES_SUBSCRIPTION);
    const { data } = useQuery<{allMessages: Message[]}>(ALL_MESSAGES);
    const [guest, setGuest] = useState<Guest | null>(null);

    const [postLoginCheck] = useMutation<LoginCheckResponse, {name: string}>(GUEST_LOGIN_MUTATION);
    const [postMessage] = useMutation<SendMessageResponse, {content: string, guestId: number}>(MESSAGE_MUTATION);

    const sendMessage = async (message: string, guestId: number) => {
        await postMessage({ variables: { content: message, guestId } });
    }

    const login = async (name: string) => {
        const { data } = await postLoginCheck({variables: {name}});
        setGuest(data?.guest_login?.guest ?? null);
    };

    const [ messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (data?.allMessages) {
            setMessages([...data.allMessages]);
        }
    }, [data])

    useEffect(() => {
        if (subData?.messageAdded) {
            setMessages([...messages, subData.messageAdded]);
        }
    }, [subData])

    const value = useMemo(() => ({ guest, login, sendMessage, messages }), [guest, messages]);

    return (
        <AuthContext.Provider value={ value }>
            { children }
        </AuthContext.Provider>
    )
}
