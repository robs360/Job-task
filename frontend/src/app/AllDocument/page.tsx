'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface Document {
  _id: string;
  title: string;
  updatedAt: string;
}

export default function Dashboard() {
  const [ownedDocs, setOwnedDocs] = useState<Document[]>([]);
  const [sharedDocs, setSharedDocs] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [showType, setShowType] = useState<'owned' | 'shared'>('owned');

  const fetchDocs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}api/v1/document`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setOwnedDocs(res.data.ownedDocs);
      setSharedDocs(res.data.sharedDocs);
    } catch (err) {
      alert('Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");

    await axios.delete(`${process.env.NEXT_PUBLIC_API_ENDPOINT}api/v1/document/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Refetch after successful deletion
    fetchDocs();
  }

  if (loading) return <p className="text-center text-lg mt-10">Loading...</p>;

  const docsToShow = showType === 'owned' ? ownedDocs : sharedDocs;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Document Dashboard</h1>

        <div className="flex justify-center gap-4 mb-8">
          <button
            className={`px-5 py-2 rounded-full shadow-md transition-all duration-300 ${showType === 'owned' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'
              }`}
            onClick={() => setShowType('owned')}
          >
            My Documents
          </button>
          <button
            className={`px-5 py-2 rounded-full shadow-md transition-all duration-300 ${showType === 'shared' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'
              }`}
            onClick={() => setShowType('shared')}
          >
            Shared With Me
          </button>
        </div>

        {docsToShow.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            {showType === 'owned' ? 'No documents. Create a new one!' : 'No shared documents.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {docsToShow.map(doc => (
              <div key={doc._id} className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition relative">
                <div className="absolute top-3 right-3 flex gap-2">

                  <Link href={`/document/${doc._id}`}><button className="bg-blue-100 p-2 rounded-full">
                    <Pencil className="w-4 h-4 text-blue-600" />
                  </button></Link>

                  {showType === 'owned' && (
                    <button onClick={() => handleDelete(doc._id)} className="bg-red-100 p-2 rounded-full">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  )}
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-2">{doc.title}</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Last updated: {new Date(doc.updatedAt).toLocaleString()}
                </p>
                <Link href={`/document/${doc._id}`}><button className="bg-blue-500 w-full text-white p-2 rounded-full">
                      Open
                  </button></Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
