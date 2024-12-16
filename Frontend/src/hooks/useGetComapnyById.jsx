import { setsingleCompany } from '@/redux/companySlice';
import { Company_API_END_POINT } from '@/utils/rconstant.js';
import axios from 'axios';
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
  useEffect(()=>{
    const fetchSingleCompany = async () => {
        try {

            const response = await axios.get(`${Company_API_END_POINT}/get/${companyId}`, {withCredentials:true});
            if (response.data.success){
                dispatch(setsingleCompany(response.data.company));

            }
        }catch(error){
            console.error(error);

        }
    }
    fetchSingleCompany();
  },[companyId, dispatch])
}

export default useGetCompanyById