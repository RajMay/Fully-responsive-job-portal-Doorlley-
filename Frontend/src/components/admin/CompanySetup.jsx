import React, { useEffect, useState } from 'react'
import Navbar from '../ui/shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { Company_API_END_POINT } from '@/utils/rconstant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetComapnyById'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: '',
        description:'',
        website:'',
        location:'',
        file:null

    });
    const {singleCompany} = useSelector(store=>store.company);

    const [loading , setLoading] = useState(false);
   
    const navigate = useNavigate();
;

    const changeEventHandler = (e)=>{
        setInput({...input , [e.target.name]:e.target.value});
    }


    const ChangeFileHandler = (e)=>{
        const file = e.target.files?.[0];
        setInput({...input , file});
    }
    
    const submitHandler = async (e)=>{
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('name',input.name);
        formdata.append('description',input.description);
        formdata.append('website',input.website);
        formdata.append('location',input.location);
        if(input.file){
        formdata.append('file',input.file);
        }

        try{
            setLoading(true);

            const res = await axios.put(`${Company_API_END_POINT}/update/${params.id}`,formdata,{
                headers:{
                    'Content-Type':'multipart/form-data',
                    
                },
                     withCredentials:true
                

            });
            if (res.data.success){
                toast.success(res.data.message);
                navigate('/admin/companies');

            }

        }catch(error)
        {
            console.log(error);
            toast.error(error.response.data.message);
        }finally{
            setLoading(false)
        }


;
    }

    useEffect(() => {
      setInput({
        name: singleCompany.name || '',
        description:singleCompany.description || '',
        website: singleCompany.website || '',
        location:singleCompany.location || '',
        file:singleCompany.file || null
      })
    
      
    }, [singleCompany]);
    
  return (
    <div>
        <Navbar />
        <div className='max-w-xl mx-auto my-10'>
<form onSubmit={submitHandler}>
    <div className='flex items-center gap-5 p-8 '>
    <Button onClick={()=>navigate("/admin/companies")} variant="outline" className='flex items-center gap-2 text-gray-500 font-semibold'>
        <ArrowLeft/>
        <span>Back</span>
    </Button>
    <h1 className='font-bold text-xl'>Company Setup</h1>

    </div>


    <div className='grid grid-cols-2 gap-2'>
    <div>
    <Label>Company Name </Label>
    <Input
        type="text"
        name="name"
        value={input.name}
        onChange={changeEventHandler} // Corrected here
        className="my-2 border-4 rounded-tl-xl rounded-br-xl"
    />
</div>
<div>
    <Label>Description </Label>
    <Input
        type="text"
        name="description"
        value={input.description}
        onChange={changeEventHandler} // Corrected here
        className="my-2 border-4 rounded-tl-xl rounded-br-xl"
    />
</div>
<div>
    <Label>Website </Label>
    <Input
        type="text"
        name="website"
        value={input.website}
        onChange={changeEventHandler} // Corrected here
        className="my-2 border-4 rounded-tl-xl rounded-br-xl"
    />
</div>
<div>
    <Label>Location </Label>
    <Input
        type="text"
        name="location"
        value={input.location}
        onChange={changeEventHandler} // Corrected here
        className="my-2 border-4 rounded-tl-xl rounded-br-xl"
    />
</div>
<div>
    <Label>Logo </Label>
    <Input
        type="file"
        accept="image/*"
        onChange={ChangeFileHandler} // Corrected here
        className="my-2 border-4 rounded-tl-xl rounded-br-xl"
    />
</div>

    </div>
    {
            loading ? <Button className="w-full my-4 bg-black text-white rounded"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait...</Button>: <Button type="submit" className="w-full my-4 bg-black rounded text-white">Update</Button>

          }

   
</form>
        </div>
        </div>
  )
}

export default CompanySetup