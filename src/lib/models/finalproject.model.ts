import { Schema, model, Document } from 'mongoose';

interface IFinalProject extends Document {
    userId: string;
    name: string;
    description: string;
    studentNo: string;
    projectTitle: string;
    techStack: string;
}

const finalProjectSchema = new Schema<IFinalProject>({
    userId: { type: String, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    studentNo: { type: String, required: true },
    projectTitle: { type: String, required: true },
    techStack: { type: String, required: true },
});

const FinalProject = model<IFinalProject>('FinalProject', finalProjectSchema);

export default FinalProject;