"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import axios from "axios";

export function ShareDocument({ id }: { id: string }) {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [token, setToken] = useState<string | null>('')
    useEffect(() => {
        const gettoken = localStorage.getItem('token');
        setToken(gettoken)
    }, [])
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Email:", token);

        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}api/v1/document/${id}/share`,
            { email, role },
            { headers: { Authorization: `Bearer ${token}` } }
        );
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white" variant="outline">
                    Share
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Share Document</DialogTitle>
                    <DialogDescription>
                        Share your document with others. Set their permissions.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="role">Access as</Label>
                        <Select onValueChange={(value) => setRole(value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Access As" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="editor">Editor</SelectItem>
                                <SelectItem value="viewer">Viewer</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit">Share</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
