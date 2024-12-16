import { setCompanies } from '@/redux/companySlice';
import { Company_API_END_POINT } from '@/utils/rconstant.js';
import axios from 'axios';
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
  useEffect(()=>{
    const fetchCompanies = async () => {
        try {

            const response = await axios.get(`${Company_API_END_POINT}/get`, {withCredentials:true});
            if (response.data.success){
                dispatch(setCompanies(response.data.companies));

            }
        }catch(error){
            console.error(error);

        }
    }
    fetchCompanies();
  },[])
}

export default useGetAllCompanies