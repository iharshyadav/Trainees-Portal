import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AuthProvider from "./context/AuthProvider";
import { authOptions } from "./api/auth/[...nextauth]/option";
import { getServerSession } from "next-auth";
import { Toaster } from 'sonner';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Footer from "./components/footer/footer";
import StudentNavbar from "./components/students/navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Attendance Portal",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions);

  const customToastOptions = {
    style: {
      background: '#fff',
      color: '#000',
    },
    success: {
      icon: <FaCheckCircle color="#4CAF50" />, // Green color for success
    },
    error: {
      icon: <FaTimesCircle color="#F44336" />, // Red color for error
    },
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider session={session} >
          {
           session && <StudentNavbar />
          }
           {children}
           {
            session && <Footer />
           }
             
           <Toaster position="top-center" theme="light" toastOptions={customToastOptions}/>
        </AuthProvider>
      </body>
    </html>
  );
}
