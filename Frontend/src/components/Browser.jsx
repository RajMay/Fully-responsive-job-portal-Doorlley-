import React, { useEffect } from 'react'
import Navbar from './ui/shared/Navbar'
import JobCard from './JobCard'
import { useDispatch, useSelector } from 'react-redux'
import { setsearchQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { motion } from "framer-motion";





const Browser = () => {
  useGetAllJobs();
  
  const {allJobs}= useSelector(store=>store.job);
  
  const dispatch = useDispatch();
  useEffect(() => {
    return ()=>{
      dispatch(setsearchQuery(""));

    }
  
    
  }, [])
  

 
  



  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto my-10'>
        <h1 className='font-bold text-xl my-10'>Search Results({allJobs.length})</h1>
       <motion.div
        initial={{opacity:0,x:100}}
        animate={{opacity:1,x:0}}
        exit={{opacity:0,x:-100}}
        transition={{duration:0.3}}
        className='grid grid-cols-3 gap-4 '> 
       {
          allJobs.map((job)=>{
            return (
              <JobCard key={job._id} job={job}/>
            )


          })
        }
       </motion.div>
      </div>
      
    </div>
  )
}

export default Browser