'use client'
import axios from 'axios';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

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
        <div className="flex justify-center">
            <button
                onClick={createNewDocument}
                className=" w-[160px] h-[194px] items-center gap-2 bg-white text-black font-semibold p-5 rounded-md shadow-sm hover:bg-gray-100 transition-all duration-300"
            >
                 <Plus className='text-blue-500 size-14 mx-auto'></Plus>   
                <span className="text-base">New Blank Docs</span>
            </button>
        </div>
    );
}
