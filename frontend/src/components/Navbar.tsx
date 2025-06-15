'use client';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../assets/docs.jpg';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [userImage, setUserImage] = useState<string | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setUserImage(user.image);
      } catch (error) {
        console.error('Failed to parse user data from localStorage:', error);
      }
    }
  }, []);

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left: Logo */}
        <div className="flex items-center space-x-3">
          <Image src={logo} alt="Logo" width={40} height={40} className="rounded-md" />
          <span className="text-2xl font-bold text-blue-600 tracking-wide">CoDoc</span>
        </div>

        {/* Middle: Menu */}
        <div className="hidden md:flex gap-6">
          <Link href="/">
            <span className="text-gray-700 hover:text-blue-600 font-medium transition text-[16px] cursor-pointer">
              Home
            </span>
          </Link>
          <Link href="/AllDocument">
            <span className="text-gray-700 hover:text-blue-600 font-medium transition text-[16px] cursor-pointer">
              All Docs
            </span>
          </Link>
          <Link href="/CreateDocument">
            <span className="text-gray-700 hover:text-blue-600 font-medium transition text-[16px] cursor-pointer">
              Create Docs
            </span>
          </Link>
        </div>

        {/* Right: User Image */}
        <div>
          {userImage ? (
            <img
              src={userImage}
              alt="User"
              
              className="rounded-full border h-[40px] w-[40px] border-gray-300 shadow-sm object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
          )}
        </div>
      </nav>
    </div>
  );
}
