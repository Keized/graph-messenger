import {MutableRefObject, useContext, useEffect, useRef, useState } from "react";
import { AuthContext, AuthContextType, Message } from "../contexts/AuthProvider";

export default function Room() {
    const ref = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
    const  { sendMessage, messages, user } = useContext(AuthContext) as AuthContextType;
    const [message, setMesage] = useState<string>('');

    const onClick = async () => {
        if (message.trim() === '') return;

        await sendMessage(message);
        setMesage('');
    };

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages])

    return <div className="">
        <div className="room__container flex flex-col max-w-[900px] h-screen mx-auto shadow-lg">
            <div className="chat bg-secondary grow-[3] overflow-auto p-4 " >
                { messages && messages.map((message: Message) => <MessageRow content={message.content} authorId={message.author.id} isMe={ parseInt(message.author.id) === user?.id } key={message.id} />) }
                <div ref={ref}/>
            </div>
            <div className="editor bg-secondary grow-[1]">
                <div className="flex h-full">
                    <textarea onChange={({target: {value}}) => { setMesage(value)}} value={message} className='border-0 flex-1 h-full p-4 focus:outline-0'></textarea>
                    <button className="w-[200px] bg-primary font-bold" onClick={onClick}>Send</button>
                </div>
            </div>
        </div>
    </div>
}

function MessageRow({content, authorId, isMe}: any) {
    return <div className={`message__row mb-8 ${isMe ? "right" : "left"}`}>
        <small>{authorId}: </small>
        <strong>{content}</strong>
    </div>
}
