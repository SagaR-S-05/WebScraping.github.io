"use client";

import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface entries_inter {
    title: string,
    entry: string
}

function HandleSubmit(e:Event) {
    console.log(e.target)
}
function HandleChange(e:Event){
    console.log(e.currentTarget)
}

export default function Dialog_cust(entrys: entries_inter) {
    return (
        <Dialog>
            <DialogTrigger>
                <Card className="w-[250px] h-[250px]" >
                    <CardHeader>
                        <CardTitle>{entrys.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{entrys.entry.slice(0, 10)}...</p>
                    </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent className="h-[600px] w-[700px]" >
                <form action="http://127.0.0.1:5000/upload" method="post">
                    <DialogHeader>
                        <DialogTitle>
                            <label htmlFor={"title"} className="pt-[100px]">
                                Enter title:
                            </label>
                            <Textarea className="mt-[10px]" defaultValue={entrys.title} id="title" name="title"/>
                        </DialogTitle>
                    </DialogHeader>
                    <label htmlFor={"entry"}>
                        Your entry:
                    </label>
                    <Textarea className="h-[300px]" defaultValue={entrys.entry} id="entry" name="entry"/>
                    <DialogFooter>
                        <Button type="submit">Update</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
