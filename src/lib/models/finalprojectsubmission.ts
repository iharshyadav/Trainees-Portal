
import { Schema, model, models } from 'mongoose';



const FinalProjectSubmissionSchema = new Schema({

  userId: {

    type: Schema.Types.ObjectId,

    ref: 'User',

    required: true,

  },

  projectName: {

    type: String,

    required: true,

  },

  projectDescription: {

    type: String,

    required: true,

  },

  githubLink: {

    type: String,

    required: true,

  },

  hostedLink: {

    type: String,

    required: true,

  },

  Name: {

    type: String,

    required: true,

  },

  studentNo: {

    type: String,

    required: true,

  },

});



const FinalProjectSubmission = models.FinalProjectSubmission || model('FinalProjectSubmission', FinalProjectSubmissionSchema);



export default FinalProjectSubmission;
