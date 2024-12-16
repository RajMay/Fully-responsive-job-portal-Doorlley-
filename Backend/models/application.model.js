import mongoose from "mongoose";

// applicants ke liye hain job apply karega 

const applicationSchema = new mongoose.Schema({
    job:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true,

    },
    applicant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    status:{
        type:String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    }

},{timestamps:true});

export const Application = mongoose.model("Application",applicationSchema)