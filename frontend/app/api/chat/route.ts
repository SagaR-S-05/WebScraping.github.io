// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface ChatRequest {
    message: string;
}

interface ChatResponse {
    reply: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: ChatRequest = await request.json();
        const userMessage = body.message;

        // Call external API to analyze emotion
        const apiResponse = await fetch('http://127.0.0.1:5000/Chat_response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage }),
        });

        if (!apiResponse.ok) {
            throw new Error('Failed to fetch emotion from external API');
        }

        const apiData = await apiResponse.json();

        const response: ChatResponse = { reply: apiData.emotion };

        return NextResponse.json(response);
    } catch (error) {
        console.error('Error processing chat request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
