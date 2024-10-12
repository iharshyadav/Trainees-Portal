import Image from "next/image";
import Link from "next/link";

export default function StudentNavbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" aria-label="Home">
              <Image
                src="/bdcoeLogo.png"
                alt="BDCOE Logo"
                width={80}
                height={80}
                className="rounded-full md:p-1 p-4 sm:p-3"
              />
            </Link>
          </div>
          <div className="flex-grow flex justify-center">
            <span className="text-white selection:bg-black lg:ml-72 md:ml-56 sm:ml-0 font-bold text-xl sm:text-2xl md:text-4xl tracking-tight">
              BDCOE Student Portal
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
