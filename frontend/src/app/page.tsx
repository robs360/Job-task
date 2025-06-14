import { Plus } from "lucide-react";
import Image from "next/image";
import docs from '../assets/docs.jpg'
import docs1 from '../assets/img1.png'
import doc2 from '../assets/img2.png'
import doc3 from '../assets/img3.png'
import Link from "next/link";
import Dashboard from "./AllDocument/page";
import Navbar from "@/components/Navbar";
export default function Home() {
  return (
    <div className="p-5">
      <Navbar></Navbar>
      <div className="grid mt-6 gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 flex-grow">
        <div className="w-[160px] mx-auto flex items-center justify-center bg-white rounded-md shadow-xl h-[200px]">
          <Link href={'/CreateDocument'}><div>
            <Plus className="text-blue-500 mx-auto size-14 font-bold"></Plus>
            <h1 className="text-center font-bold">Create New Docs</h1>
          </div></Link>
        </div>
        <div className="w-[160px] flex mx-auto items-center justify-center bg-white rounded-md shadow-xl h-[200px]">
          <Image src={docs} alt="" width={180}></Image>
        </div>
        <div className="w-[160px] mx-auto bg-white rounded-md shadow-xl h-[200px]">
             <Image src={docs1} alt="" width={180}></Image>
        </div>
        <div className="w-[160px] mx-auto bg-white rounded-md shadow-xl h-[200px]">
             <Image src={doc3} alt="" width={180}></Image>
        </div>
        
        <div className="w-[160px] mx-auto bg-white rounded-md shadow-xl h-[200px]">
              <Image src={doc2} alt="" width={180}></Image>
        </div>
      </div>
      <Dashboard></Dashboard>
    </div>
  );
}
