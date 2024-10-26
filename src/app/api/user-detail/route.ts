// app/api/user-detail/route.js

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import {authOptions} from '@/app/api/auth/[...nextauth]/option';
import {ConnectToDB} from '@/lib/db';
import {User} from '@/lib/models/user.model';

type UserDetailType = {
  Name: string;
  studentNo: string;
  projects: any[];
} | null;

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Please Login" },
        { status: 401 }
      );
    }

    await ConnectToDB();

    const body = await request.json();
    const { studentNo } = body;

    const userDetail = await User.findOne({ studentNo }).lean() as UserDetailType;

    if (userDetail) {
      const { Name, studentNo: StudentNo, projects } = userDetail;
      return NextResponse.json({ userDetail: { Name, studentNo: StudentNo, projects }, status: 200 });
    } else {
      return { message: 'User not found', status: 404 };
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
