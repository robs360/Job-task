'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { ShareDocument } from '@/components/shared/ShareDocument';
import { getSocket } from '@/utils/socket';

// Dynamic import of Jodit Editor
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

export default function DocumentEditor() {
    const editor = useRef<any>(null);
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [role, setRole] = useState('viewer');
    const [loading, setLoading] = useState(true);

    // Memoized editor config
    const editorConfig = useMemo(() => ({
        readonly: role === 'viewer',
        toolbar: role !== 'viewer',
    }), [role]);

    // Fetch document data on load
    useEffect(() => {
        if (!id) return;
        const fetchDoc = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}api/v1/document/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setContent(res.data.document.content);
                setTitle(res.data.document.title);
                setRole(res.data.role);

                // After fetching, set editor value directly to prevent flickering
                if (editor.current) {
                    editor.current.setEditorValue(res.data.document.content);
                }
            } catch (err) {
                router.push('/dashboard');
            } finally {
                setLoading(false);
            }
        };
        fetchDoc();
    }, [id, router]);

    // Save document function (debounced below)
    const saveDocument = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(`${process.env.NEXT_PUBLIC_API_ENDPOINT}api/v1/document/${id}`, { content, title }, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (err) {
            router.push('/login')
        }
    };

    // Debounced auto-save (only when not viewer)
    useEffect(() => {
        if (loading || role === "viewer") return;

        const timer = setTimeout(saveDocument, 1000);
        return () => clearTimeout(timer);
    }, [content, title, role, loading]);

    // Socket.io integration
    useEffect(() => {
        const socket = getSocket();

        if (!id) return;

        socket.emit('join-document', id);

        socket.on('receive-changes', (newContent: string) => {
            setContent(newContent);
            if (editor.current) {
                editor.current.setEditorValue(newContent);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [id]);

    // Handle editor content change
    const handleContentChange = useCallback((newContent: string) => {
        setContent(prev => {
            if (prev !== newContent) {
                const socket = getSocket();
                socket.emit('send-changes', { documentId: id, content: newContent });
                return newContent;
            }
            return prev;
        });
    }, [id]);

    if (loading) return <p>Loading document...</p>;

    return (
        <div className="bg-gray-100 min-h-screen py-10 px-4">
            <h1 className='text-2xl text-center font-semibold text-blue-600 mb-8'>
                You are {role}
            </h1>

            <div className="p-6 bg-white shadow-xl rounded-xl max-w-6xl mx-auto flex md:flex-row flex-col-reverse gap-8">

                <div className="flex-1">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={role === 'viewer'}
                        placeholder="Document Title"
                        className="border border-gray-300 p-3 mb-6 w-full text-2xl font-semibold rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none disabled:bg-gray-100"
                    />

                    {role === 'viewer' ? (
                        <div className="border p-6 min-h-[400px] bg-gray-50 rounded-lg prose max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: content }} />
                        </div>
                    ) : (
                        <div className="border rounded-lg overflow-hidden">
                            {/* @ts-ignore to ignore typescript warning for setEditorValue usage */}
                            <JoditEditor
                                ref={editor}
                                value={content}
                                config={editorConfig}
                                onChange={(newContent) => {
                                    handleContentChange(newContent);
                                }}
                            />
                        </div>
                    )}
                </div>

                {role !== 'viewer' && role !== 'editor' && (
                    <div className="w-full md:w-[300px]">
                        <ShareDocument id={id} />
                    </div>
                )}
            </div>
        </div>
    );
}
