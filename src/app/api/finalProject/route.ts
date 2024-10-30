
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/option';
import { ConnectToDB } from '@/lib/db';
import { User } from '@/lib/models/user.model';
import FinalProject from '@/lib/models/finalproject.model';

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
    const { projectTitle , description, techStack,name,studentNo  } = body;

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
    const existingProject = await FinalProject.findOne({ userId });
    if (existingProject) {
        existingProject.projectTitle = projectTitle;
        existingProject.description = description;
        existingProject.techStack = techStack;
        await existingProject.save();
    } else {
      const project = new FinalProject({
        userId,
        projectTitle,
        description,
        techStack,
        name,
        studentNo
      });
      console.log(project)
      await project.save();
      console.log("Project submitted");
    }

    return NextResponse.json(
      {
        message: "Project Added",
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
