
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/option';
import { ConnectToDB } from '@/lib/db';
import { User } from '@/lib/models/user.model';
import Profile from '@/lib/models/profile.model';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          error: "Please Login",
        },
        { status: 401 }
      );
    }

    await ConnectToDB();

    const body = await req.json();
    console.log(body)
    const { github, leetcode, codeforces, codechef } = body;

    console.log(github, leetcode, codeforces, codechef);

    const user = await User.findOne({
      studentNo: session.user.studentNo,
    }).lean();

    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        { status: 404 }
      );
    }

    const userId = Array.isArray(user) ? user[0]._id : user._id;

    console.log(userId,"userId");

    // Create or update profile data
    const existingProfile = await Profile.findOne({ userId });
    if (existingProfile) {
      existingProfile.github = github;
      existingProfile.leetcode = leetcode;
      existingProfile.codeforces = codeforces;
      existingProfile.codechef = codechef;
      await existingProfile.save();
    } else {
      const profile = new Profile({
        userId,
        github,
        leetcode,
        codeforces,
        codechef,
      });
      console.log(profile)
      await profile.save();
      console.log("Profile Created");
    }

    return NextResponse.json(
      {
        message: "Profile Link Added",
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
