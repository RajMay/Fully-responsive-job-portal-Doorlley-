import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/rconstant";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import axios from "axios";

const UpdateProfileDialog = ({ open, setopen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);


  const [input, setInput] = useState({
    fullname:user?.fullname,
    email:user?.email,
    phoneNumber:user?.phoneNumber,
    bio:user?.profile?.bio,
    skills:user?.profile?.skills?.map((skill) => skill),
    file:user?.profile?.file
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // const changeEventHandler = (e) => {
  //   const { name, value } = e.target;
    
  //   setInput({
  //     ...input,
  //     [name]: name === "skills" ? value.split(",") : value, // Split skills into an array; keep others unchanged
  //   });
  // };


  
  //file wala


  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
    
  };

  const submitHandler = async (e) => {
    e.preventDefault();
   

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    // formData.append("skills", input.skills.join(","));
    if (input.file) {
      console.log(input.file);
      formData.append("file", input.file);
    }else {
      console.warn("No resume file to upload.");
  }


    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      // console.log("API Response:", res.data);

      if (res.data.success){
          dispatch(setUser(res.data.user));
          toast.success(res.data.message);
      }
      
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
    finally{
      setLoading(false);
    }
    setopen(false);
  

    console.log(input);
  };
  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="bg-white text-black  sm:max-w-[425px]"
          onInteractOutside={() => setopen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className=" grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="fullname"
                  type="text"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  className="col-span-3 rounded-lg"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phoneNumber" className="text-right">
                  Number
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Input
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">
                  Skills
                </Label>
                <Input
                  id="skills"
                  name="skills"
                  // value={input.skills}
                  value={input.skills} 
                  // value={Array.isArray(input.skills) ? input.skills.join(", ") : input.skills}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  Resume
                </Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                 
                  onChange={fileChangeHandler}
                  accept="application/pdf"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  loading...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full my-4 bg-black rounded text-white"
                >
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
