import { JOB } from "../models/job.model.js";


// admin post karega
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.userId;
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Please fill all the fields",
        status: false,
      });
    };
    //Create
    const job = await JOB.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      createdBy: userId,
    });
    return res.status(200).json({
      message: "Job posted successfully",
      job,
      status: true,
    });
  } catch (error) {
    console.log(error);
  }
};
// student ke liye jo student karega
export const getAllJobs = async (req, res) => {
  try {
    // filter like ex : wholelink?keyword="frontend dev"
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await JOB.find(query).populate({
        path: "company"
    }).sort({
        createdAt: -1
    })
    
    
    // still work  imp for interview
    if (!jobs) {
      return res.status(404).json({
        message: "No jobs found",
        status: false,
      });
    }
    return res.status(200).json({
      message: "Jobs found",
      jobs,
      success: true,

    });
  } catch (error) {
    console.log(error);
  }
};
// ye apna user wala job or student

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await JOB.findById(jobId).populate({
      path:"applications"
    });
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        status: false,
      });
    }
    return res.status(200).json({
      message: "Job found",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// admin kitne job create kraa abhi tak wo bhi toh search karega

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.userId;
   
   
   
    const jobs = await JOB.find({ createdBy: adminId }).populate({
      path:'company',
      createdAt:-1
    }); //will use populate later
   
    if (!jobs) {
      return res.status(404).json({
        message: "No jobs found",
        status: false,
      });
    }
    return res.status(200).json({
      message: "Jobs found",
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
