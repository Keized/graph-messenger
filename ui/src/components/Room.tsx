import { useSubscription } from "@apollo/client";
import {MutableRefObject, useContext, useEffect, useRef, useState } from "react";
import { MESSAGES_SUBSCRIPTION } from "../API";
import { AuthContext, AuthContextType, Message } from "../contexts/AuthProvider";
import MessageRow from "./MessageRow";

export default function Room() {
    const ref = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
    const  { sendMessage, messages, guest } = useContext(AuthContext) as AuthContextType;
    const [message, setMesage] = useState<string>('');

    const onClick = async () => {
        if (message.trim() === '') return;

        if (guest?.id) {
            await sendMessage(message, guest.id);
            setMesage('');
        }
    };

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages])

    return <div className="">
        <div className="flex flex-col max-w-[900px] p-3 h-screen mx-auto shadow-lg">
            <div className="chat bg-secondary grow-[1] overflow-auto p-4 " >
                { messages && messages.map((message: Message) => <MessageRow content={message.content} author={message.author.name} isMe={ message.author.id == guest?.id } key={message.id} />) }
                <div ref={ref}/>
            </div>
            <div className="editor bg-secondary">
                <div className="flex gap-10 items-end">
                    <textarea 
                        rows={5}
                        onChange={({target: {value}}) => { setMesage(value)}}
                        value={message} 
                        className='border-0 flex-1 p-3 h-full p-4 focus:outline-0 rounded-2xl bg-input-bg'
                    ></textarea>
                    <button className="h-[60px] w-[60px] bg-primary p-3 font-bold rounded-2xl " onClick={onClick}>Send</button>
                </div>
            </div>
        </div>
    </div>
}
