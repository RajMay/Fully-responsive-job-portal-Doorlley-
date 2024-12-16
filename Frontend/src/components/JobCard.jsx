import { Bookmark } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const JobCard = ({job}) => {
  const navigate = useNavigate();
  // const jobId = "randomstring";

  const daysAgo =(mongodbTime)=>{
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiff = currentTime - createdAt;
    return Math.floor(timeDiff/(1000*24*60*60));



  }

  return (
    <div className="p-5 rounded shadow-xl bg-white border border-gray-100">
      <div className="flex item-center justify-between">
      <p className="text-sm text-gray-600">{daysAgo(job?.createdAt) == 0 ? "Today": `${daysAgo(job?.createdAt)} days ago`} </p>
      <Button  className="rounded-full" size="icon">
        <Bookmark />
      </Button>
      </div>
      
                            
                





      <div className="flex items-center gap-2 my-3">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage  src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
         <h1 className="font-medium text-lg">{job?.company?.name}</h1>
         <p className="text-sm text-gray-600">{job?.location}</p>
        </div>
       
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={'text-blue-700 font-bold '} variant="ghost">{job?.position} Postions</Badge>
        <Badge className={'text-[#F83002] font-bold '} variant="ghost">{job?.jobType}</Badge>

        <Badge className={'text-[#7209B7] font-bold '} variant="ghost">{job?.salary} LPA</Badge>

      </div>
      <div className="flex item-center  gap-4 mt-4">
        <Button onClick={()=>navigate(`/description/${job?._id}`)}>Details</Button>
        <Button className="bg-[#7209B7] text-white rounded-lg">Save for later</Button>
      </div>
    </div>
  );
};

export default JobCard;
