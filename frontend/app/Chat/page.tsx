"use client";
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

function ChatBubbleIn(prop:{text:string}) {
    return (
        <div className="chat chat-start">
            <div className="chat-bubble">
                {prop.text}
            </div>
        </div>
    )
}
function ChatBubbleOut(prop:{text:string}) {
    return (
        <div className="chat chat-end">
            <div className="chat-bubble">{prop.text}</div>
        </div>
    )
}
const ChatPage = () => {
    const [message, setMessage] = useState('');
    const [chatLog, setChatLog] = useState<{ user: string; bot: string }[]>([]);
    const [error, setError] = useState<string | null>(null);

    const sendMessage = async () => {
        if (!message.trim()) return;
        console.log(JSON.stringify({ message }))
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });
            console.log(response)
            if (!response.ok) throw new Error('Failed to send message');

            const data = await response.json();
            setChatLog((prev) => [...prev, { user: message, bot: data.reply }]);
            setMessage('');
        } catch (err) {
            console.log(err);
            setError("error");
        }
    };

    return (
        <div>
            <h1>Chat</h1>
            {chatLog.map((log, index) => (
                <div key={index} className='w-[80rem] p-10'>
                    <ChatBubbleOut text={log.user}/>
                    <ChatBubbleIn text={log.bot}/>
                </div>
            ))}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {/* <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            /> */}
            <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
        // <div className='w-[80rem] p-10'>
        //     <ChatBubbleIn />
        //     <ChatBubbleOut />
        // </div>
    );
};

export default ChatPage;
