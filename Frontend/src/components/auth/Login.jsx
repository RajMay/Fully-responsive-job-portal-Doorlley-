import React, { useEffect, useState } from "react";
import Navbar from "../ui/shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/rconstant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";


const Login = () => {

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: ""
  });
     const {loading, user} = useSelector(store =>store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const changeEventhandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submithandler = async (e)=>{
    e.preventDefault();

  
   
    // api ka khel hoga
    try{
      dispatch(setLoading(true));
      const response = await axios.post(`${ USER_API_END_POINT}/login`,input,{
        headers:{
          "Content-Type":"application/json"},
          withCredentials:true,
      });
      if (response.data.success){
        dispatch(setUser(response.data.user));
        console.log("Dispatched setUser:", response.data.user);
        // console.log(response.data.user) 
        navigate("/")
        toast.success(response.data.message);
       
      }
    }catch(error){
      console.log(error);
      toast.error(error.response.data.message)
     
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
          <h1 className="font-bold text-xl mb-5">Login</h1>

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
            <Label>Password</Label>
            <Input
              className="rounded"
              type="password"  // Changed to "password" type
              value={input.password}
              name="password"
              onChange={changeEventhandler}
              placeholder="****"
            />
          </div>

          <div className="flex items-center justify-between m-3">
            <RadioGroup defaultValue="comfortable"  className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
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
                  checked={input.role === 'recruiter'}
                  onChange={changeEventhandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {
            loading ? <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>loading...</Button>: <Button type="submit" className="w-full my-4 bg-black rounded text-white">Login</Button>

          }

          <span className="text-sm">
            Don't have an account? <Link to="/Signup" className="text-blue-600">SignUp</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
