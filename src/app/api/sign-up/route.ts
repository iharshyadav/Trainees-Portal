import {User} from '@/lib/models/user.model';
import {ConnectToDB} from '@/lib/db';
import {NextResponse } from "next/server";


const students = [
  { name: 'Aakash Saini', studentNo: '2310219', email: 'aakash2310219@akgec.ac.in' },
  { name: 'Abhay Agrawal', studentNo: '2313072', email: 'abhayag41@gmail.com' },
  { name: 'Abhishek Rajdhar Dubey', studentNo: '2311022', email: 'abhishek2311022@akgec.ac.in' },
  { name: 'Aman Singh', studentNo: '2311048', email: 'aman2311048@akgec.ac.in' },
  { name: 'Anjali Gupta', studentNo: '2310202', email: 'anjali2310202@akgec.ac.in' },
  { name: 'Ankush Sharma', studentNo: '2311025', email: 'ankush2311025@akgec.ac.in' },
  { name: 'Anshika Sharma', studentNo: '2311118', email: 'anshika2311118@akgec.ac.in' },
  { name: 'Aryan Gupta', studentNo: '2310135', email: 'guptafamily3005@gmail.com' },
  { name: 'Ayush Jaiswal', studentNo: '2313058', email: 'aj85163@gmail.com' },
  { name: 'Ayush Singh', studentNo: '2310170', email: 'ayush2310170@akgec.ac.in' },
  { name: 'Divya Rai', studentNo: '23153041', email: 'divya23153041@akgec.ac.in' },
  { name: 'Ehsan Ali', studentNo: '23154125', email: 'ehsan23154125@akgec.ac.in' },
  { name: 'Harshit Singhal', studentNo: '2312101', email: 'harshit2312101@akgec.ac.in' },
  { name: 'Ichchha Gupta', studentNo: '2313222', email: 'ichchha2313222@akgec.ac.in' },
  { name: 'Kavya Garg', studentNo: '2313152', email: 'kavya2313152@akgec.ac.in' },
  { name: 'Maulshree Gupta', studentNo: '2312142', email: 'maulshreegupta2004@gmail.com' },
  { name: 'Manya Agarwal', studentNo: '23169062', email: 'manya23169062@akgec.ac.in' },
  { name: 'Meet Goyal', studentNo: '2212019', email: 'meet2212019@akgec.ac.in' },
  { name: 'Mohd Aman', studentNo: '2310021', email: 'mohd2310021@akgec.ac.in' },
  { name: 'Mohit Yadav', studentNo: '23153025', email: 'mohit23153025@akgec.ac.in' },
  { name: 'Naman Kumar', studentNo: '2312090', email: 'naman2312090@akgec.ac.in' },
  { name: 'Nikhil Dixit', studentNo: '23154058', email: 'nikhil23154058@akgec.ac.in' },
  { name: 'Parikshit Jaiswal', studentNo: '2313007', email: 'parikshit2313007@akgec.ac.in' },
  { name: 'Piyush Kumar', studentNo: '23153101', email: 'piyush23153101@akgec.ac.in' },
  { name: 'Poorva Jain', studentNo: '2312004', email: 'poorva2312004@akgec.ac.in' },
  { name: 'Pranay Shrivastava', studentNo: '23153011', email: 'pranay23153011@akgec.ac.in' },
  { name: 'Prince Chaurasiya', studentNo: '2331048', email: 'girjawatiku@gmail.com' },
  { name: 'Pushpanjali Verma', studentNo: '23154073', email: 'pushpanjali23154073@akgec.ac.in' },
  { name: 'Rachit Daksh', studentNo: '23153016', email: 'rachitdaksh29@gmail.com' },
  { name: 'Rishabh Ranjan', studentNo: '2310113', email: 'rishabh2310113@akgec.ac.in' },
  { name: 'Rishabh Shrivastava', studentNo: '2313126', email: 'rishabh2313126@akgec.ac.in' },
  { name: 'Rishit Singh', studentNo: '2313103', email: 'rishitinc@gmail.com' },
  { name: 'Saksham Rajput', studentNo: '23153098', email: 'saksham23153098@akgec.ac.in' },
  { name: 'Samriddhi Yadav', studentNo: '2310108', email: 'samriddhi2310108@akgec.ac.in' },
  { name: 'Shashank Singh', studentNo: '23154013', email: 'shashank23154013@akgec.ac.in' },
  { name: 'Simran Singh', studentNo: '2321092', email: 'simran2321092@akgec.ac.in' },
  { name: 'Sparsh Gupta', studentNo: '2311143', email: 'sparsh2311143@akgec.ac.in' },
  { name: 'Tushar Sharma', studentNo: '2313025', email: 'tushar2313025@akgec.ac.in' },
  { name: 'Ujjawal Verma', studentNo: '2310171', email: 'ujjawal2310171@akgec.ac.in' },
  { name: 'Vansh Atrey', studentNo: '2310032', email: 'vansh2310032@akgec.ac.in' },
  { name: 'Vinayak Gupta', studentNo: '23154096', email: 'vinayak23154096@akgec.ac.in' },
  { name: 'Yatharth Shukla', studentNo: '23164020', email: 'yatharth23164020@akgec.ac.in' }
]

export async function POST(req:Request) {
    try {
      await ConnectToDB();
    const body = await req.json();
    const {studentNo, password ,name} = body;

    // console.log(studentNo, password);
    // console.log(body);
    // console.log("here")

    if (!studentNo || !password || !name) {
      return NextResponse.json({ message: 'studentNo and password are required' }, { status: 400 });
    }

    const existingUser = await User.findOne({ studentNo });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const findExistingUser = students.filter((student) => student.studentNo == studentNo)

    console.log(findExistingUser)

    if (findExistingUser.length === 0) {
      return NextResponse.json({ error: 'Invalid Authorization' }, { status: 400 });
    }

    const user = new User({ studentNo, password , Name : name});
    await user.save();

    return NextResponse.json({ message: 'User created successfully!' });
    } catch (error) {
      return NextResponse.json ({
        error : "Failed to Register"
      })
    }
  }
