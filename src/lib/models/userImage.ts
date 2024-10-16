import  { Schema, model, models } from "mongoose";

const profileImageSchema = new Schema({
    userId : {type : String , required : true},
    name : {type : String , required : true},
    profileImage: { type: String },
});
  
  
  const ProfileImages = models?.ProfileImages || model('ProfileImages', profileImageSchema);

  export default ProfileImages;