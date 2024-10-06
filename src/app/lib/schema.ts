import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    studentNo: {type : String , unique : true , required : true},
    password: {type : String , required : true},
}, {
    timestamps: true
});

export const User = mongoose.models?.User || mongoose.model("User", userSchema);