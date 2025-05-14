"use client";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Dialog_cust from "@/components/Dialog_cust"
import { useEffect, useState } from "react"



interface entries_inter {
    title: string,
    entry: string
}

interface Entries_data {
    Date: string,
    entries: entries_inter[]
}


function Cust_Button(prop: Entries_data) {
    return (<>
        <p>{prop.Date}</p>
        <hr className="w-[100vmax] p-3 " />
        <div className="flex flex-row">
            {
                prop.entries.map((entrys, index) => (
                    <a className="pl-7 " key={index}>
                        <Dialog_cust entry={entrys.entry} title={entrys.title}/>
                    </a>
                ))
            }
        </div>
    </>
    )
}

export default function Entries_Ro() {
    const [data, setData] = useState<Entries_data[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/entries');
                if (!res.ok) throw new Error('Failed to fetch data');
                const result = await res.json();
                setData(result);
            } catch (err) {
                setError("error");
            }
        };

        fetchData();
    }, []);
    console.log(data)
    // let entries: Entries_data[] = [{
    //     "Date": "13-12-2024",
    //     "entries": [
    //         {
    //             "title": "day 1",
    //             "entry": "i did nothing"
    //         },
    //         {
    //             "title": "",
    //             "entry": ""
    //         },
    //         {
    //             "title": "",
    //             "entry": ""
    //         }]
    // },
    // {
    //     "Date": "13-12-2024",
    //     "entries": [
    //         {
    //             "title": "",
    //             "entry": ""
    //         },
    //         {
    //             "title": "",
    //             "entry": ""
    //         },
    //         {
    //             "title": "",
    //             "entry": ""
    //         }]
    // },
    // {
    //     "Date": "13-12-2024",
    //     "entries": [
    //         {
    //             "title": "",
    //             "entry": ""
    //         },
    //         {
    //             "title": "",
    //             "entry": ""
    //         },
    //         {
    //             "title": "",
    //             "entry": ""
    //         }]
    // }]
    let entries=data;
    return (
        <div className="p-10 ">
            <Dialog_cust entry={"+"} title={""}/>
            {entries.map((entry, index) => (
                <Cust_Button key={index} Date={entry.Date} entries={entry.entries} />
            ))}
        </div>
    )
}