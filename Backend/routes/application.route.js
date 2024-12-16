import express from "express";
import { applyjobs, getApplicants, getAppliedJobs, updateStatus } from "../controllers/applicants.controller.js";
import isAuthenticated from "../middlewares/isauthenticated.js";

const router = express.Router();



router.route("/apply/:id").get(isAuthenticated,applyjobs);

router.route("/get").get(isAuthenticated,getAppliedJobs);   //all jobs
router.route("/:id/applicants").get(isAuthenticated,getApplicants);

router.route("/status/:id/update").post(isAuthenticated,updateStatus);  // Need to make middleware so that only authenticated user only able to update there profile

export default router;

