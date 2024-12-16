import React, { useState } from 'react'
import Navbar from './ui/shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJob from './AppliedJob'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'


Label
// const skills = ["js", "react", "ml", "tailwind", "python"]
const IsResume = true

const Profile = () => {
    useGetAppliedJobs();
    const [open , setopen] = useState(false);
    const {user} = useSelector(store => store.auth);
  

  return (
    <div>
        <Navbar/>
        <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
            <div className='flex  justify-between'>
            <div className='flex item-center gap-4'>
            <Avatar className="h-24 w-24">
                <AvatarImage  src={user?.profile?.profilePhoto}/>
        
               
            </Avatar>
            <div>
            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
            <p>{user?.profile?.bio}</p>
            
            </div>
            </div>
            <Button onClick={()=> setopen(true)} className="text-right" ><Pen/></Button>

            </div>
            <div className='my-5'>
                <div className='flex item-center gap-3 my-2'>
                <Mail/>
                <span>{user?.email}</span>
                </div>
                <div className='flex item-center gap-3 my-2'>
                <Contact/>
                <span> {user?.phoneNumber}</span>
                </div>
                
                

            </div>
            <div >
                <h1 className='font-bold'>Skills</h1>
                <div className='flex items-center gap-3 mt-3'>
                {
                    user?.profile?.skills.length  ? user?.profile?.skills.map((item,index)=><Badge className="bg-black text-white rounded-xl" key={index}>{item}</Badge>) : <span>NA</span>
                }
                </div>
               
            </div>

            <div className='grid w-full max-w-sm items-center gap-1 mt-4'>
                <Label className="text-md font-bold">
                     Resume
                </Label>
              {  IsResume ? <a target ="blank" href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a>: <span>NA</span> }

            </div>
            
           
           
        </div>
        <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>
                     Applied jobs
                </h1>
                <AppliedJob />


            </div>

            <UpdateProfileDialog open ={open} setopen={setopen}/>
        
    </div>
  )
}

export default Profile