import  { Schema, model, models } from "mongoose";

const leaderSchema = new Schema({
    userId : {type : String , required : true},
    Name : {type : String , required : true},
});
  
  
  const Leader = models?.Leader || model('Leader', leaderSchema);

  export default Leader;