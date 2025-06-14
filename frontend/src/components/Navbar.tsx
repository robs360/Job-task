import Image from 'next/image';
import Link from 'next/link';
import logo from '../assets/docs.jpg'
export default function Navbar() {
  return (
   <div>
     <nav className="bg-white shadow-md p-4 flex justify-between items-center mx-w-8xl">
      <div className="text-xl font-bold text-blue-600 flex space-x-2">CoDoc <Image src={logo} alt='' width={50}></Image></div>
      <div className="flex gap-4">
        <Link href="/" className='border rounded-md px-2 py-1'>
          <span className="cursor-pointer text-gray-700 hover:text-blue-600 text-[15px] font-medium">Home</span>
        </Link>
        <Link href="/AllDocument" className='border rounded-md px-2 py-1'>
          <span className="cursor-pointer text-gray-700 hover:text-blue-600 text-[15px] font-medium">All Docs</span>
        </Link>
        <Link href="/CreateDocument" className='border rounded-md px-2 py-1'>
          <span className="cursor-pointer text-gray-700 hover:text-blue-600 text-[15px] font-medium">Create Docs</span>
        </Link>
      </div>
    </nav>
   </div>
  );
}
