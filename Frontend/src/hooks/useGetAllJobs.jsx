import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/rconstant.js';
import axios from 'axios';
import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    const {searchQuery} = useSelector(store=>store.job);
    const dispatch = useDispatch();

  useEffect(()=>{
    const fetchAllJobs = async () => {
        try {

            const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchQuery}`, {withCredentials:true});
          
          
            if (res.data.success){
                dispatch(setAllJobs(res.data.jobs));

            }
        }catch(error){
            console.error(error);

        }
    }
    fetchAllJobs();
  },[])
}

export default useGetAllJobs