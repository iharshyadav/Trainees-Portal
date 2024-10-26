import  { Schema, model, models } from "mongoose";

const profileSchema = new Schema({
    userId: {type:String, ref:'User', required:true},
    github: {type:String, required:true},
    leetcode : {type:String, required:true},
    codeforces : {type:String, required:true},
    codechef : {type:String, required:true},
});

const Profile = models?.Profile || model('Profile', profileSchema);

export default Profile;