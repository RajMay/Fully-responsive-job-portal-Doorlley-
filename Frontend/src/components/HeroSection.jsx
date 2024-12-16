import { setsearchQuery } from '@/redux/jobSlice';
import { Icon, Search } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query ,setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler =()=>{
    dispatch(setsearchQuery(query));
    navigate("/Browser");

  }



  return (
    <div className='text-center '>
      
        <span className=' text-bold mx=auto px-4 py-2 rounded-full bg-gray-200 text-[#F83002]'>
            Doorly : Services at your doors
        </span>

          <div className='flex flex-col gap-5 my-6'>
             <h1  className='text-5xl font-bold m-2'>
            Search , apply & <br/> Get your <span className='text-[#6A38C2]'> Dream Jobs</span> </h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit perferendis sint voluptatem error accusamus ab culpa</p>

            <div className='flex w-[40%] shadow-lg border-gray-200 pl-3 rounded-full items-center mx-auto gap-4 mt-4'>
                <input 
                type="text"

                placeholder='Find your dream jobs'
                onChange={(e)=>setQuery(e.target.value)}
                className='outline-none border-none w-full ' />
               <button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2] p-2">
                 <Search className="h-5 w-5 text-white" />
                 </button>

            </div>
       
          </div>
       


    </div>
  )
}

export default HeroSection