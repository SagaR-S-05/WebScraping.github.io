import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

interface EntriesInter {
    title: string;
    entry: string;
}

interface EntriesData {
    Date: string;
    entries: EntriesInter[];
}

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/JournalEntries'; 
const client = new MongoClient(uri);

async function getClient() {
        await client.connect();
    return client;
}

export async function GET(request: NextRequest) {
    try {
        const client = await getClient();
        const db = client.db('Journal');
        const collection = db.collection('Entries'); 

        const data = await collection.find().toArray();

        // Format the data as EntriesData
        const formattedData: EntriesData[] = data.map((item: any) => ({
            Date: item.Date || 'Unknown Date', 
            entries: item.enteries?.map((entry: any) => ({
                title: entry.title || 'Untitled',
                entry: entry.entry || 'No content provided', 
            })) || [], 
        }));

        return NextResponse.json(formattedData);
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}