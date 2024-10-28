"use server"

import { authOptions } from "@/app/api/auth/[...nextauth]/option"
import { getServerSession } from "next-auth"
import Attendance from "./models/attendance.model"
import { ConnectToDB } from "./db"
import { User } from "./models/user.model"
import FlagUsers from "./models/flag.model"
import ProfileImages from "./models/userImage"
import GroupProject from "./models/groupProject"
import Leader from "./models/Leader.model"

export const showAttendence = async () => {

    const session = await getServerSession(authOptions)
    // console.log(session)
    if (!session) {
      return {
        error : "Please Login"
      }
    }

    const userId = session.user.studentNo;

    await ConnectToDB();

    const allData = await Attendance.find({userId}).lean();

    const plainData = JSON.parse(JSON.stringify(allData));

    // console.log(plainData,"sdfsf")

    return plainData;

}


export const saveNewProject = async (name : string , description : string , date : string) => {
  
  try {

    const session = await getServerSession(authOptions)
    console.log(session)
    if (!session) {
      return {
        error : "Please Login"
      }
    }

    await ConnectToDB();

    const uniqueName = await User.findOne({
      studentNo: session.user.studentNo
    });
    
    if (uniqueName) {
      const uniqueProject = uniqueName.projects.find((topic: any) => topic.title === name);
    
      if (uniqueProject) {
        return {
          error: "Project Name already exists!! Try a different name",
          status: 404
        };
      }
    }
    const saveProject = await User.findOneAndUpdate(
     {studentNo : session.user.studentNo},
     {
      $push : {
        projects : {
          title : name,
          link : description,
          submissionDate : new Date(date)
        }
      }
     },
     {new : true}
    ).lean()

    return {saveProject , status : 200};

  } catch (error) {
    console.log(error);
    return {error , status : 404};
  }

}

export const showAllUserDetails = async () => {
  try {
    
    await ConnectToDB();

    const allUser = await User.find({});

    return allUser;

  } catch (error) {
    return error;
  }
}

export const showFlaggedUserDetail = async (userId:string) => {
  try {
    
    await ConnectToDB();

    const user = await FlagUsers.findOne({userId}).lean();

    console.log(user,"sjsjsj")
    return user;

  } catch (error) {
    return error;
  }
}

export const showFlaggedUserDetailStudent = async (userId:string | undefined) => {
  try {
    
    await ConnectToDB();

    
    const user = await User.findOne({studentNo : userId});
    
    if(!user){
      console.log("first")
      return null
    }

    const fetchById = await FlagUsers.findOne({userId : user._id}).lean()

    return fetchById;

  } catch (error) {
    return error;
  }
}

export const fetchUserProjects = async () => {
  try {
    const session = await getServerSession(authOptions);
    console.log(session);
    if (!session) {
      return {
        error: "Please Login",
        status: 401
      };
    }

    await ConnectToDB();

    const user = await User.findOne({
      studentNo: session.user.studentNo
    }).lean();

    if (!user) {
      return {
        error: "User not found",
        status: 404
      };
    }

    if (Array.isArray(user)) {
      return {
        error: "Unexpected user data format",
        status: 500
      };
    }

    return {
      projects: user?.projects || [],
      status: 200
    };

  } catch (error) {
    console.log(error);
    return { error, status: 500 };
  }
};

export const onUpload = async (image: string) => {
  try {
    const session = await getServerSession(authOptions);
    console.log(session);
    if (!session) {
      return {
        error: "Please Login",
        status: 401
      };
    }

    // console.log(session.user.name , "dvsvsw")
    
    await ConnectToDB();
    
    let user = await ProfileImages.findOne({ userId: session?.user.studentNo }).lean();

    if (!user) {
      user = await ProfileImages.create({
        userId: session?.user.studentNo,
        name : session?.user.name,
        profileImage: image
      });
      
      if (Array.isArray(user)) {
        return user[0].toObject();
      }
    
      return user ? user.toObject() : null; 
    }

    const updateUser = await ProfileImages.findOneAndUpdate(
      { userId: session?.user.studentNo },
      { profileImage: image },
      { new: true }
    ).lean();

    return updateUser;
  } catch (error) {
    console.error("Failed to upload profile image:", error);
    throw new Error("Failed to upload profile image");
  }
};

export const showProfile = async (studentNo: string | undefined) => {
  try {
    await ConnectToDB();
    const userImages = await ProfileImages.findOne({
      userId: studentNo,
    }).lean();

    return userImages && !Array.isArray(userImages) ? userImages.profileImage : null;
  } catch (error) {
    console.error("Failed to fetch user image:", error);
    throw new Error("Failed to fetch user image");
  }
};

interface TeamMember {
  id: string;
  name: string;
  studentNumber: string;
}

interface GroupProjectData {
  projectName: string;
  projectDescription: string;
  githubLink: string;
  hostedLink?: string;
  teamMembers: TeamMember[];
  leaderStudentNo: string | undefined;
  leaderName: string | undefined | null;
}

export async function submitGroupProject(data: GroupProjectData) {
  await ConnectToDB();

  if(data.githubLink === "" || data.hostedLink === "" || data.leaderName === "" || data.leaderStudentNo === "" || data.projectDescription === "" || data.projectName === ""){
    return { success: false, message: "Failed to submit project.Please fill all the fields!!!" };
  }

  const existingProject = await GroupProject.findOne({ leaderStudentNo: data.leaderStudentNo });
  if (existingProject) {
    return { success: false, message: "You have already submitted a project." };
  }

  const groupProject = new GroupProject({
    projectName: data.projectName,
    projectDescription: data.projectDescription,
    githubLink: data.githubLink,
    hostedLink: data.hostedLink,
    teamMembers: data.teamMembers,
    leaderStudentNo: data.leaderStudentNo,
    leaderName: data.leaderName,
  });

  try {
    await groupProject.save();
    return { success: true, message: "Project submitted successfully." };
  } catch (error) {
    console.error("Failed to save project:", error);
    return { success: false, message: "Failed to submit project." };
  }
}

export const LeaderAccess = async (studentNo : string | undefined) => {

  await ConnectToDB();
  
  const findLeader = await Leader.findOne({userId : studentNo})

  if(!findLeader){
    return { success: false};
  }

  return { success: true};
}

export const addLeader = async (name : string , studentNo : string) => {
  
  await ConnectToDB();
  
  if(name === "" || studentNo === ""){
    return { success: false, message: "Fill all the fields!!!" }; 
  }

  const findLeader = await Leader.findOne({userId : studentNo})

  if(findLeader){
    return { success: false, message: "Leader already marked!!!" };
  }

  await Leader.create({
    userId : studentNo,
    Name : name
  })

  return { success: true, message: "Leader marked!!!" };

}
