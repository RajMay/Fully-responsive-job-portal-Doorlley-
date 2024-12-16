import mongoose from "mongoose";
const jobSchema = new mongoose.Schema({
  title: {
    type:String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  requirements: [
    {
      type: String,
    },
  ],

  salary: {
    type: Number,
    required: true,
  },

  experienceLevel:{
    type: Number,
    required: true,

  },

  location: {
    type: String,
    required: true,
  },

  jobType:{
    type: String,
    required: true,
  },

  position:{
    type: Number,
    required: true,
  },
  company:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'company',
    required:true,
  },
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'user',  // Jo apna admin hoga wo
    required:true,
  },

  applications:[{           // why?  
    type: mongoose.Schema.Types.ObjectId,
    ref:'Application',
    
  }],

},{timestamps:true});

export const JOB = mongoose.model("Job",jobSchema);