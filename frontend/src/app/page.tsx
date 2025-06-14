import { Plus } from "lucide-react";
import Image from "next/image";
import docs from '../assets/docs.jpg'
import docs1 from '../assets/img1.png'
import doc2 from '../assets/img2.png'
import doc3 from '../assets/img3.png'
import Link from "next/link";
import Dashboard from "./AllDocument/page";
import Navbar from "@/components/Navbar";
import CreateDocumentButton from "./CreateDocument/page";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Your Documents</h1>

        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* Create New Docs */}
          <CreateDocumentButton></CreateDocumentButton>

          {/* Existing Templates */}
          <div className="h-48 mx-auto w-[160px] bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex items-center justify-center">
            <Image src={docs} alt="doc" width={160} height={200} className="object-contain" />
          </div>

          <div className="h-48 w-[160px] mx-auto bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex items-center justify-center">
            <Image src={docs1} alt="doc" width={160} height={200} className="object-contain" />
          </div>

          <div className="h-48 w-[160px] mx-auto bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex items-center justify-center">
            <Image src={doc3} alt="doc" width={160} height={200} className="object-contain" />
          </div>

          <div className="h-48 w-[160px] mx-auto bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex items-center justify-center">
            <Image src={doc2} alt="doc" width={160} height={200} className="object-contain" />
          </div>
        </div>

        {/* Document Dashboard */}
        <div className="mt-10">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}
