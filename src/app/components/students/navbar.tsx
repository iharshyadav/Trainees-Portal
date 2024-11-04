import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function StudentNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" aria-label="Home">
              <Image
                src="/bdcoeLogo.png"
                alt="BDCOE Logo"
                width={80}
                height={80}
                className="rounded-full p-2 md:p-3 transition-transform transform hover:scale-105"
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-white font-semibold hover:text-gray-200 transition-colors duration-200">
              Home
            </Link>
            <Link href="https://bdcoe.co.in" className="text-white font-semibold hover:text-gray-200 transition-colors duration-200">
              About
            </Link>
            <Link href="https://bdcoe.co.in/achievements" className="text-white font-semibold hover:text-gray-200 transition-colors duration-200">
              Achievements
            </Link>
            <Link href="https://bdcoe.co.in/#contact" className="text-white font-semibold hover:text-gray-200 transition-colors duration-200">
              Contact
            </Link>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              <svg
                className="w-8 h-8 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-600 rounded-b-lg shadow-lg">
          <div className="flex flex-col space-y-2 p-4">
            <Link href="/" className="text-white font-semibold hover:text-gray-200 transition-colors duration-200" onClick={toggleMenu}>
              Home
            </Link>
            <Link href="https://bdcoe.co.in" className="text-white font-semibold hover:text-gray-200 transition-colors duration-200" onClick={toggleMenu}>
              About
            </Link>
            <Link href="https://bdcoe.co.in/achievements" className="text-white font-semibold hover:text-gray-200 transition-colors duration-200" onClick={toggleMenu}>
              Achievements
            </Link>
            <Link href="https://bdcoe.co.in/#contact" className="text-white font-semibold hover:text-gray-200 transition-colors duration-200" onClick={toggleMenu}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
