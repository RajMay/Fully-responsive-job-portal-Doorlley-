import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

import React from "react";
import { Button } from "../button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/rconstant";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import axios from "axios";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const logoutHandler = async () => {
  //   try {
  //     const res = await axios.get(`${USER_API_END_POINT}/logout`, {
  //       withCredentials: true,
  //     });
  //     console.log("Response:", res);

  //     if (res.data.success) {
  //       dispatch(setUser(null));
  //       navigate("/");
  //       toast.success(res.data.message);
  //     }

  //   } catch (error) {
  //     console.log(Error);
  //     toast.error(error.response.data.message);
  //   }
  // };
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      // console.log("API Response:", res);

      if (res?.data?.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Doorlly<span className="text-[#6A38C2]">Jobs</span>
          </h1>
        </div>

        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies" className="">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className="">
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/browser" className="">
                    Browser
                  </Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <button variant="outline">Login</button>
              </Link>
              <Link to="/signup">
                <button className="bg-[#6A38C2] hover:bg-[#5b30a6] rounded py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                  Signup
                </button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer w-10 h-10 rounded-full overflow-hidden">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-white-100 shadow-xl mx-5 px-5 rounded-xl ">
                <div className="">
                  <div className="flex gap-3 space-y-6 space-x-2">
                    <Avatar className="cursor-pointer w-14 h-14 rounded-full !important overflow-hidden">
                      <AvatarImage src={user?.profile?.profilePhoto} />
                    </Avatar>

                    <div>
                      <h4 className="font-medium">{user.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col my-3 gap-3 text-gray-600">
                    {
                      user && user.role === "student" && (

                        <div className="flex w-fit items-center gap-3 cursor-pointer ">
                        <User2 />
                        <button variant="link">
                          <Link to="/profile">View Profile</Link>
                        </button>
                      </div>
                      )
                    }
                  

                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <button onClick={logoutHandler} variant="link">
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
