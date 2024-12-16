import express from "express";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";

import isAuthenticated from "../middlewares/isauthenticated.js";

const router = express.Router();



router.route("/post").post(isAuthenticated,postJob);

router.route("/get").get(isAuthenticated,getAllJobs);   //all jobs
router.route("/getadminjobs").get(isAuthenticated,getAdminJobs);

router.route("/get/:id").get(isAuthenticated,getJobById);  // Need to make middleware so that only authenticated user only able to update there profile

export default router;


