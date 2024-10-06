// Import necessary modules
import Attendance from '@/lib/models/attendance.model';
import { ConnectToDB } from '@/lib/db';
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/option";
import { getServerSession } from "next-auth/next";

export async function GET() {
  await ConnectToDB();

  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  console.log(session);
  try {
    // Retrieve all attendance records sorted by date in descending order
    const attendances = await Attendance.find().sort({ date: -1 });
    return NextResponse.json(attendances, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching attendance records.', error }, { status: 500 });
  }
}
