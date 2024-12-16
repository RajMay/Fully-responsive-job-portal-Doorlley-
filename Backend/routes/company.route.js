import express from "express";

import isAuthenticated from "../middlewares/isauthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();



router.route("/register").post(isAuthenticated,registerCompany);

router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyById);

router.route("/update/:id").put(isAuthenticated,singleUpload , updateCompany);  // Need to make middleware so that only authenticated user only able to update there profile

export default router;


