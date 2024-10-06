import "next-auth";
import { DefaultSession } from "next-auth";

// Extend next-auth module
declare module 'next-auth' {
  // Define the User interface
  interface User {
    _id?: string; // MongoDB user ID
    isVerified?: boolean; // Verification status
    studentNo?: string; // Student number
    name?: string; // User's name
    projects?: Array<{ title: string; link: string; submissionDate: Date }>; // User's projects
    role?: "admin" | "user"; // User role
  }

  // Extend the Session interface
  interface Session {
    user: {
      _id?: string; // MongoDB user ID
      isVerified?: boolean; // Verification status
      studentNo?: string; // Student number
      name?: string; // User's name
      projects?: Array<{ title: string; link: string; submissionDate: Date }>; // User's projects
      role?: "admin" | "user"; // User role
    } & DefaultSession['user']; // Include default user properties
  }
}
