//Business logic kya hoga
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";




export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      
      return res.status(400).json({
        message: "Please fill all the fields",
        success: false,
      });
    };
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);


    // @@@@@@@@@@@@      REGISTER LE LIYE HAIN YE SAB     @@@@@@@@@@@@@@

    // check if with same email already registerd email exist
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "Email already exist",
        success: false,
      })
    }
    // password ko hassesd karenge                     // salt value how strong is your password
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile:{
        profilePhoto:cloudResponse.secure_url,
        

      }
    });

    return res.status(201).json({
        message: "User created successfully",
        success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// @@@@@@@@@  LOGIN KE LIYE LOGIC    @@@@@@@@@@@

export const login = async (req, res) => {
  try {
    // role yani student or recruiter
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Please fill all the fields",
        success: false,
      });
    }

    // check karenge ki jo login kar raha hain wo exist karta hain ki nahi
    // agar nahi toh register kar be chaman

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    // Password check

    const isPasswordmatch = bcrypt.compare(password, user.password);
    if (!isPasswordmatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    // Check role is correct or not :

    if (role != user.role) {
      return res.status(400).json({
        message: "Incorrect role",
        success: false,
      });
    };

// Token generate 


const tokenData = {
    userId:user._id
}

const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn:'1d'});
user  ={
    _id:user._id,
    fullname:user.fullname,
    email:user.email,
    phoneNumber:user.phoneNumber,
    role:user.role,
    profile:user.profile,

}

return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000, httpsOnly:true,sameSize:'strict'}).json({
    message: `welcome back  ${user.fullname}`,
    user,
    
    success: true,
})

  } catch (error) {
    console.log(error);
    
  }
};

// @@@@@@@   LOG OUT   @@@@@@@@




export const logout = async(req,res)=>{
    try {
return res.status(200).cookie("token","",{maxAge:0}).json({
    message: "logged out successfully",
    success: true,
})

    }
    catch(error){
console.log(error)

    }
}


// @@@@@  update profile @@@@@@



export const updateProfile = async (req,res) =>{

    try
    {
        const{fullname,email,phoneNumber,bio,skills} = req.body;
        const file =req.file;
        // console.log("req.file:", req.file);
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        // let cloudResponse = null;
        // if (file) {
        //     try {
        //         const fileUri = getDataUri(file);
        //         cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        //     } catch (err) {
        //         console.error("Error uploading file to Cloudinary:", err);
        //         return res.status(500).json({
        //             message: "File upload failed",
        //             success: false,
        //         });
        //     }
        // }


        

        let skillsArray =[];
        if(skills){
             skillsArray = skills.split(",");
        }
        // if (!fullname || !email || !phoneNumber || !bio || !skills) {
        //     return res.status(400).json({
        //       message: "Please fill all the fields",
        //       success: false,
        //     });
        //   };
         // cloudinary part 



          // skills strings mai aayega toh usko array mai convert karna hain 

         
          // update only for logged in user 

          const userId = req.userId; //where? -> middleware authentication
          let user = await User.findById(userId);
          if(!userId){
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
    }
      if(fullname)   user.fullname = fullname;
      if(email)   user.email = email;
      if (phoneNumber) user.phoneNumber = phoneNumber;
      if (bio) user.profile.bio = bio;
      // if(skills)   user.skills = skillsArray;
      if (skillsArray) user.profile.skills = skillsArray;
      if(cloudResponse){
        user.profile.resume = cloudResponse.secure_url;
        user.profile.resumeOriginalName = file.originalname;
      }

      


 
   
   
   
    
   







 await user.save();

 user  ={
    _id:user._id,
    fullname:user.fullname,
    email:user.email,
    phoneNumber:user.phoneNumber,
    role:user.role,
    profile:user.profile,

}
return  res.status(200).json({
    message: `welcome back ${user.fullname} `,
    user,
    success: true,
});




    }catch(error){

        console.log(error)
    }
}














