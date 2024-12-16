import { setAllAppliedJobs } from '@/redux/jobSlice';
import { Application_API_END_POINT } from '@/utils/rconstant';
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'


const useGetAppliedJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      const fetchAppliedJobs = async ()=>{
        try{

            const res = await axios.get(`${Application_API_END_POINT}/get`,{
                withCredentials:true
            });
            if(res.data.success){
                dispatch(setAllAppliedJobs(res.data.application));
            }



        }catch(error){
            console.error(error);
        }
      }
    fetchAppliedJobs();
      
    }, [])
    
  return (
    <div>

    </div>
  )
}

export default useGetAppliedJobs