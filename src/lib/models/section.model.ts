import mongoose, { Schema, Document } from "mongoose";

interface IWebsiteSection extends Document {
  sectionName: string;
  isActive: boolean;
}

const WebsiteSectionSchema: Schema = new Schema({
  sectionName: { type: String, required: true, unique: true },
  isActive: { type: Boolean, required: true, default: false },
});

// export default mongoose.models.WebsiteSection ||
//   mongoose.model<IWebsiteSection>("WebsiteSection", WebsiteSectionSchema);

  export const WebsiteSection = mongoose.models?.WebsiteSection || mongoose.model("WebsiteSection", WebsiteSectionSchema);