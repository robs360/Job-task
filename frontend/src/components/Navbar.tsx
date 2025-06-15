'use client';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../assets/docs.jpg';
import { useEffect, useState } from 'react';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function Navbar() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
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

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    signOut()
    window.location.href = '/login';
  };

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
        <div className="relative inline-block text-left">
          <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
            {userImage ? (
              <img
                src={userImage}
                alt="User"
                className="rounded-full border h-[42px] w-[42px] border-gray-300 shadow object-cover transition hover:scale-105"
              />
            ) : (
              <div className="w-[42px] h-[42px] rounded-full bg-gray-300 animate-pulse"></div>
            )}
          </div>

          {isOpen && (
            <div
              className="absolute right-0 mt-2 w-40 origin-top-right bg-white border border-gray-200 rounded-lg shadow-xl transition-all duration-300 z-50"
            >
              <button
                onClick={() => {
                  handleLogOut()
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition"
              >
                <LogOut className="text-lg text-red-500 size-6" />
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
