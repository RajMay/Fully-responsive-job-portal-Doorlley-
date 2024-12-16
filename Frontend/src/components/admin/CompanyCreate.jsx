import React, { useState } from 'react'
import Navbar from '../ui/shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Company_API_END_POINT } from '@/utils/rconstant'
import { useDispatch } from 'react-redux'
import { setsingleCompany } from '@/redux/companySlice'
import { toast } from 'sonner'

const ComapnyCreate = () => {
    const dispatch  = useDispatch();
    const navigate = useNavigate();
    const [companyName, setcompanyName] = useState()
    const registerNewCompany =  async () => {
        try{

            const res = await axios.post(`${Company_API_END_POINT}/register`,{companyName},{
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials:true

            });
            if(res?.data?.success){
                dispatch(setsingleCompany(res.data.company));
                toast.success(res.data.message)
                const companyId = res?.data?.company?._id;
                
                navigate(`/admin/companies/${companyId}`);
            }

           




        }catch(error){
            console.log(error);
        }
    }
  return (
    <div>
        <Navbar />
        <div className='max-w-4xl mx-auto'>
            <div className='my-10'>
            <h1 className='font-bold text-2xl'>Your Company Name </h1>
            <p className='text-gray-500'>what would you like to give your company name ? you can change this later.</p>

            </div>
           
                <Label>Company Name </Label>
                <Input 
                type="text"
                className='my-2 border-4 rounded-tl-xl rounded-br-xl '
                placeholder='Google, Microsoft etc'
                onChange={(e)=>setcompanyName(e.target.value)}

                
                
                />
                <div className='flex items-center gap-2 my-10'>
                    <Button  variant ="outline" onClick={()=>navigate("/admin/companies")} className='rounded'> Cancel</Button>
                    <Button onClick={registerNewCompany} className='bg-black text-white rounded'>Continue</Button>

                </div>
        </div>
    </div>
  )
}

export default ComapnyCreate