import { setAllAdminJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/rconstant.js';
import axios from 'axios';
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetAdminJobs = () => {
    const dispatch = useDispatch();
  useEffect(()=>{
    const fetchAllAdminJobs = async () => {
        try {

            const response = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {withCredentials:true});
           
            if (response.data.success){
                dispatch(setAllAdminJobs(response.data.jobs));
               

            }
        }catch(error){
            console.error(error);

        }
    }
    fetchAllAdminJobs();
  },[])
}

export default useGetAdminJobs