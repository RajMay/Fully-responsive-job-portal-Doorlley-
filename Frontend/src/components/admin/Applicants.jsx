import React from 'react'
import Navbar from '../ui/shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'
import axios from 'axios'
import { Application_API_END_POINT } from '@/utils/rconstant'

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const {applicants} = useSelector(store=>store.application)
    

    useEffect(() => {
      const fetchAllApplicants = async ()=>{
        try{

            const res = await axios.get(`${Application_API_END_POINT}/${params.id}/applicants`,{
                withCredentials:true
            });
           
            if(res.data.success){
               dispatch(setAllApplicants(res.data.job))
            }

        }catch(error){
            console.log(error)
        }
      }
      fetchAllApplicants();
      
    }, [])
    
  return (
    <div>
        <Navbar />
        <div className='max-w-7xl mx-auto'>
            <h1 className='font-bold text-xl my-3.5'>Applicants ({applicants.applications.length})</h1>
            <ApplicantsTable />

        </div>
    </div>
  )
}

export default Applicants
