import React, { useEffect, useState } from 'react'
import Navbar from '../ui/shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAdminJobs from '@/hooks/useGetAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const AJobs = () => {
  useGetAdminJobs();
  const [input, setInput] = useState("");
 
  const navigate = useNavigate();
  const dispatch = useDispatch();

   

    useEffect(() => {
      dispatch(setSearchJobByText(input));
    
      
    }, [input])
    
 
  return (
    <div>
        <Navbar/>
        <div className=' max-w-5xl mx-auto my-10'>
            <div className='flex  items-center justify-between my-5'>
            <Input
            className="w-fit rounded-xl "
            placeholder=" Enter company "
            onChange = {(e)=>setInput(e.target.value)}

            />
            <Button onClick={()=>navigate("/admin/jobs/create")} className="bg-black text-white rounded">New Jobs</Button>

            </div>
            <AdminJobsTable />
           
        </div>
    </div>
  )
}

export default AJobs