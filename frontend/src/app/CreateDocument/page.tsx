'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FilePlus } from 'lucide-react';  // modern icon
import { useEffect, useState } from 'react';

export default function CreateDocumentButton() {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [email, setEmail] = useState('')

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            setEmail(user.email);
        }
    }, []);
    console.log(email, " ", token)
    const createNewDocument = async () => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}api/v1/document/create`, { title: 'Untitled Document', content: 'First Document', owner: email },
                {
                    headers: {
                        Authorization: `Bearer ${token}`  // ✅ send token here
                    }
                }
            );

            router.push(`/document/${res.data._id}`);

        } catch (err) {
            alert('Error creating document');
        }
    };

    return (
        <div className="flex justify-center my-6">
            <button
                onClick={createNewDocument}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
                <FilePlus className="w-5 h-5" />
                Create New Document
            </button>
        </div>
    );
}
