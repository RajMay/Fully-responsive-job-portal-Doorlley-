import React, { useEffect, useState } from "react";
import Navbar from "../ui/shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/rconstant";
import {  useDispatch ,useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";



const Signup = () => {
  const [input, setInput] = useState({
    fullname:"",
    email:"",
    phoneNumber:"",
    password:"",
    role:"",
    file:""
  });

  const navigate = useNavigate();
  const {loading, user } = useSelector((store=>store.auth));
  const dispatch = useDispatch()

  const changeEventhandler = (e)=>{
    setInput({...input,[e.target.name]:e.target.value});
  }

  const changeFilehandler = (e)=>{
    setInput({...input, file:e.target.files?.[0]});
  }


  const submithandler = async (e)=>{
    e.preventDefault();
    const formData  = new FormData();
    formData.append("fullname",input.fullname)
    formData.append("email",input.email)
    formData.append("phoneNumber",input.phoneNumber)
    formData.append("password",input.password)
    formData.append("role",input.role)
    if(input.file){
      formData.append("file",input.file)

    }
    // api ka khel hoga
    try{
      dispatch(setLoading(true));
      const response = await axios.post(`${ USER_API_END_POINT}/register`,formData,{
        headers:{
          "Content-Type":"multipart/form-data"},
          withCredentials:true,
      });
      if (response.data.success){
        navigate("/login")
        toast.success(response.data.message);
       
      }
    }catch(error){
      console.log(error);
      toast.error(error.response.data.message);

    }
    finally{
      dispatch(setLoading(false));
    }
  }
useEffect(() => {
    if(user){
      navigate("/")
    }
  
    
  }, [])
  




  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-6xl mx-auto">
        <form
          onSubmit={submithandler}
          className="w-1/2 border border-grey-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label>Full name</Label>


            <Input className="rounded" 
            type="text" 
            value={input.fullname}
            name="fullname"
            onChange={changeEventhandler}
            placeholder="Name" />
          </div>


          <div className="my-2">
            <Label>Email</Label>
            <Input
              className="rounded"
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventhandler}
              placeholder="@gmail.com"
            />
          </div>



          <div className="my-2">
            <Label>Phone Number</Label>
            <Input className="rounded" type="text"  value={input.phoneNumber}
            name="phoneNumber"
            onChange={changeEventhandler} placeholder="91+"></Input>
          </div>



          <div className="my-2">
            <Label>Password</Label>
            <Input className="rounded" type="password"  value={input.password}
            name="password"
            onChange={changeEventhandler}  placeholder="****"></Input>
          </div>



          <div className="flex items-center justify-between m-3">
            <RadioGroup defaultValue="comfortable" className="flex items-center gap-4 my-5">


              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                    value="student"
                  checked={input.role == 'student'}
                  onChange={changeEventhandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter" 
                  checked={input.role == 'recruiter'}
                  onChange={changeEventhandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>


            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input 
              accept="image/*" 
              type="file"   // name same with multer storage
              onChange={changeFilehandler}
               className="cursor-pointer" />
            </div>
          </div>

          {
            loading ? <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>loading...</Button>: <Button type="submit" className="w-full my-4 bg-black rounded text-white">SignUp</Button>

          }

          <span className="text-sm">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
