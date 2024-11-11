import mongoose, { Schema, Document, model, models } from 'mongoose';

interface FinalProject extends Document {
  userId: string;
  Name: string;
  projectName: string;
  projectDescription: string;
  githubLink: string;
}

const ProjectSchema = new Schema<FinalProject>({
  userId: { type: String, required: true, ref: 'User' },
  Name: { type: String, required: true },
  projectName: { type: String, required: true },
  projectDescription: { type: String, required: true },
  githubLink: { type: String, required: true },
});

// export default mongoose.models.GroupProject || mongoose.model<GroupProject>('GroupProject', GroupProjectSchema);
const Finalproject = models?.projectProgress || model('projectProgress',ProjectSchema);
export default Finalproject;
