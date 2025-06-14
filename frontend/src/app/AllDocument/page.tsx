'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

interface Document {
  _id: string;
  title: string;
  updatedAt: string;
}

export default function Dashboard() {
  const router = useRouter()
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
      router.push('/login')
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

  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_ENDPOINT}api/v1/document/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      await fetchDocs(); // make sure fetchDocs is also async

      await Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    } catch (error) {
      console.error(error);
      await Swal.fire({
        title: "Error!",
        text: "Failed to delete document.",
        icon: "error"
      });
    }
  }
}


  if (loading) return <p className="text-center text-lg mt-10">Loading...</p>;

  const docsToShow = showType === 'owned' ? ownedDocs : sharedDocs;

  return (
    <div className="min-h-screen mt-10 bg-gray-100 p-4">
      <div className="max-w-8xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Document Dashboard</h1>

        <div className="flex justify-center gap-4 mb-8">
          <button
            className={`px-5 py-2 rounded-full shadow-md transition-all duration-300 ${showType === 'owned' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'}`}
            onClick={() => setShowType('owned')}
          >
            My Documents
          </button>
          <button
            className={`px-5 py-2 rounded-full shadow-md transition-all duration-300 ${showType === 'shared' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'}`}
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
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow-lg">
              <thead>
                <tr className="bg-blue-100 text-gray-700 text-left">
                  <th className="py-3 px-4">Doc</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Last Updated</th>
                  <th className="py-3 px-4">Edit</th>
                  {showType === 'owned' && <th className="py-3 px-4">Delete</th>}
                  <th className="py-3 px-4">Open</th>
                </tr>
              </thead>
              <tbody>
                {docsToShow.map(doc => (
                  <tr key={doc._id} className="border-t hover:bg-gray-50 transition">
                    <td className="py-3 px-4">
                      📄
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-800">{doc.title}</td>
                    <td className="py-3 px-4 text-gray-500">{new Date(doc.updatedAt).toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <Link href={`/document/${doc._id}`}>
                        <button className="bg-blue-100 p-2 rounded-full">
                          <Pencil className="w-4 h-4 text-blue-600" />
                        </button>
                      </Link>
                    </td>

                    {showType === 'owned' && (
                      <td className="py-3 px-4">
                        <button onClick={() => handleDelete(doc._id)} className="bg-red-100 p-2 rounded-full">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </td>
                    )}

                    <td className="py-3 px-4">
                      <Link href={`/document/${doc._id}`}>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
                          Open
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>

  );
}
