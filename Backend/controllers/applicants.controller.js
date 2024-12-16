import { Application } from "../models/application.model.js";
import { JOB } from "../models/job.model.js";


export const applyjobs = async (req,res)=>{
    try{
         const userId = req.userId;
        //  const {id:jobId} = req.perams
        const jobId = req.params.id;
        if(!jobId){
            return res.status(400).json({message:"Job id is required",success:false});


           
        };

        // user pehle apply kar chuka hain ki nahi kar chuka 
        const isApplied = await Application.findOne({applicant:userId,job:jobId});
        if(isApplied){
            return res.status(400).json({message:"You have already applied for this job",success:false});
        }

        // check if the job exist or not 
        const job = await JOB.findById(jobId);
        if(!job){
            return res.status(400).json({message:"Job not found",success:false});

        }
        //create a new application 

        const newApplication = await Application.create({
            applicant:userId,
            job:jobId
        });
        job.applications.push(newApplication._id);
        await job.save();
        return res.status(200).json({
            message:"Application submitted successfully",
            success:true
        })










    }catch(error){
        console.log(error)
    }

}
 /// jo jo jobs mai user apply kara hoga uska list milega yaha
export const getAppliedJobs = async (req,res)=>{
    try{

        const userId = req.userId;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:"job",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"company",
                options:{sort:{createdAt:-1}},

            }
        });
       
        if(!application){
            return res.status(404).json({message:"No application found",success:false});
            
            
        }

        return res.status(200).json({
            message:"Application found successfully",
           application,
            success:true,
        })
    }catch(error){
        console.log(error)
    }
}
//admin check karega uske job post pe kitne users ne apply kiya 
export const getApplicants = async (req,res)=>{
    try{

        const jobId = req.params.id; // job id hain
        const job = await JOB.findById(jobId).populate({
            path:"applications",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"applicant",
            }
        })
        if(!job){
            return res.status(400).json({message:"No job found",success:false});
        }
        return res.status(200).json({
           job,
            success:true,
            

        })

    }catch(error){
        console.log(error)
    }
}

export const updateStatus = async (req,res)=>{
    try{
           const {status} = req.body;
           const applicationId =    req.params.id;          // ye id hain ki konse id ka status update karna hian
        if(!status){
            return res.status(400).json({message:"status is require",success:false});

        }
             // find the application by application id 
             const application = await Application.findOne({_id:applicationId});
             if(!application){
                return res.status(400).json({message:"Application not found",success:false});
             };

             // update status 


             application.status = status.toLowerCase();
             await application.save();

             return res.status(200).json({
                message:"Status updated successfully",
                success:true,
             })


             

    }catch(error){
        console.log(error)
    }

}