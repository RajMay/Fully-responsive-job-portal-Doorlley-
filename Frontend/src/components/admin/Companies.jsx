import React, { useEffect, useState } from 'react'
import Navbar from '../ui/shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setsearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
  const [input, setInput] = useState("");
  useGetAllCompanies();
  const navigate = useNavigate();
  const dispatch = useDispatch();

   

    useEffect(() => {
      dispatch(setsearchCompanyByText(input));
    
      
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
            <Button onClick={()=>navigate("/admin/companies/create")} className="bg-black text-white rounded">New Company</Button>

            </div>
            <CompaniesTable/>
           
        </div>
    </div>
  )
}

export default Companies