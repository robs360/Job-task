'use client'
import Image from 'next/image';
import Link from 'next/link';
import logo from '../assets/docs.jpg'
import { useEffect, useState } from 'react';
export default function Navbar() {
    const [userImage, setUserImage] = useState<string | null>(null);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setUserImage(user.image);  // extract image and store in state
      } catch (error) {
        console.error('Failed to parse user data from localStorage:', error);
      }
    }
  }, []);
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
         {userImage ? (
            <Image src={userImage} alt="User" width={48} height={58} className='rounded-full' />
          ) : (
            <div className='w-10 h-10 rounded-full bg-gray-300'></div>  // fallback if image not loaded yet
          )}
      </div>
    </nav>
   </div>
  );
}
