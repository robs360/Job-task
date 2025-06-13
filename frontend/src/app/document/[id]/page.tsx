'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

export default function DocumentEditor() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [role, setRole] = useState('viewer');
  const [loading, setLoading] = useState(true);

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
      } catch (err) {
        alert('Error fetching document or access denied');
        router.push('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchDoc();
  }, [id, router]);

  const saveDocument = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${process.env.NEXT_PUBLIC_API_ENDPOINT}api/v1/document/${id}`, { content, title }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      alert('Failed to save document');
    }
  };

  // Auto-save with debounce
  useEffect(() => {
    if (loading) return;
    const timer = setTimeout(saveDocument, 1000);
    return () => clearTimeout(timer);
  }, [content, title]);

  if (loading) return <p>Loading document...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={role === 'viewer'}
        placeholder="Document Title"
        className="border p-2 mb-4 w-full text-xl font-semibold"
      />
      {role === 'viewer' ? (
        <div className="border p-4 min-h-[400px] prose" dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        <JoditEditor
          value={content}
          onChange={(newContent) => setContent(newContent)}
        />
      )}
    </div>
  );
}

// const router = useRouter();
//   const params = useParams();
//   const id = params?.id as string;  // cast to string for TypeScript safety

//   const [content, setContent] = useState('');
//   const [title, setTitle] = useState('');
//   const [role, setRole] = useState('viewer');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!id) return;

//     const fetchDoc = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}api/v1/document/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         setContent(res.data.document.content);
//         setTitle(res.data.document.title);
//         setRole(res.data.role);
//       } catch (err) {
//         alert('Error fetching document or access denied');
//         router.push('/dashboard');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDoc();
//   }, [id, router]);

//   const saveDocument = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(`${process.env.NEXT_PUBLIC_API_ENDPOINT}api/v1/document/${id}`, { content, title }, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//     } catch (err) {
//       alert('Failed to save document');
//     }
//   };

//   // Auto-save after debounce (2 seconds)
//   useEffect(() => {
//     if (loading) return;
//     const timer = setTimeout(saveDocument, 2000);
//     return () => clearTimeout(timer);
//   }, [content, title]);

//   if (loading) return <p>Loading document...</p>;

// react-quill-new 