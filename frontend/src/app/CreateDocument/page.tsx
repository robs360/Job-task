'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FilePlus } from 'lucide-react';
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
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}api/v1/document/create`,
                { title: 'Untitled Document', content: 'First Document', owner: email },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            router.push(`/document/${res.data._id}`);

        } catch (err) {
            router.push('/login')
            alert('Error creating document');
        }
    };

    return (
        <div className="flex justify-center my-6">
            <button
                onClick={createNewDocument}
                className="flex items-center gap-2 bg-white text-black font-semibold border border-gray-300 px-8 py-3 rounded-md shadow-sm hover:bg-gray-100 transition-all duration-300"
            >
                <FilePlus className="w-5 h-5 text-blue-600" />
                <span className="text-base">New Blank Document</span>
            </button>
        </div>
    );
}
