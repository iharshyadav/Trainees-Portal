import mongoose, { Schema, Document, model, models } from 'mongoose';

interface TeamMember {
  id: string;
  name: string;
  studentNumber: string;
}

interface GroupProject extends Document {
  projectName: string;
  projectDescription: string;
  githubLink: string;
  hostedLink?: string;
  teamMembers: TeamMember[];
  leaderStudentNo: string;
  leaderName: string;
}

const TeamMemberSchema = new Schema<TeamMember>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  studentNumber: { type: String, required: true },
});

const GroupProjectSchema = new Schema<GroupProject>({
  projectName: { type: String, required: true },
  projectDescription: { type: String, required: true },
  githubLink: { type: String, required: true },
  hostedLink: { type: String },
  teamMembers: { type: [TeamMemberSchema], required: true },
  leaderStudentNo: { type: String, required: true },
  leaderName: { type: String, required: true },
});

// export default mongoose.models.GroupProject || mongoose.model<GroupProject>('GroupProject', GroupProjectSchema);
const GroupProject = models?.GroupProject || model('GroupProject', GroupProjectSchema);
export default GroupProject;
