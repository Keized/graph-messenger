export default function Room() {
    const myId = 1;

    const messages = [
        {
            content: "Hey",
            author: {
                id:  1
            }
        },
        {
            content: "Ho",
            author: {
                id:  2
            }
        }
    ]



    return <div>
        <div className="room__container">
            {
                messages.map(message => <MessageRow content={message.content} authorId={message.author.id} isMe={message.author.id === myId} />)
            }
        </div>

    </div>
}


function MessageRow({content, authorId, isMe}: any) {
    return <div className={`message__row ${isMe ? "right" : "left"}`}>
        <small>{authorId}</small>
        <br/>
        {content}
    </div>
}
