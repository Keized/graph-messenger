type MessageRowProps = {
    content: string;
    author: string;
    isMe: boolean;   
}

export default function MessageRow({content, author, isMe}: MessageRowProps) {
    return <div className={` mb-8 flex ${isMe ? 'justify-end' : 'justify-start'}`}>
        <div className="">
            <small className="opacity-50">{author}</small>
            <div className={`rounded-2xl py-2 px-3 ${isMe ? 'bg-secondary-bg' : 'bg-ternary-bg'}`}>{content}</div>
        </div>
    </div>
}