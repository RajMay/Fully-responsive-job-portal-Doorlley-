import React, { useState } from 'react'
import Navbar from '../ui/shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem,  SelectTrigger } from '../ui/select'
import { SelectValue } from '@radix-ui/react-select'
import { toast } from 'sonner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { JOB_API_END_POINT } from '@/utils/rconstant'



const PostJobs = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        title: '',
        description: '',
        requirements:'',
        salary:'',
        location:'',
        jobType:'',
        experience:'',
        position:0,
        companyId:''
    });

    const {companies} = useSelector(store=>store.company)





    const changeEventHandler = (e)=>{
        setInput({...input, [e.target.name]:e.target.value});

    };

    // select wale se input lene ka tarika 

    const selectChangeHandler = (value)=>{
       const selectedCompanies = companies.find((company)=>company.name.toLowerCase()=== value);
       setInput({...input, companyId:selectedCompanies._id});
    };

    const submitHandler = async (e)=>{
        e.preventDefault();
        try{
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`,input, {
                headers:{
                    'Content-Type':'application/json'

                },
                withCredentials:true
            });
            if (res.data.success){
                toast.success(res.data.message)
                navigate("/admin/jobs");
            }

        }catch(error){
            toast.error(error.response.data.message)
            console.log(error)
          

        }finally{
            setLoading(false);
        }
       
    }



    



  return (
    <div>
        <Navbar/>
        <div className='flex items-center justify-center w-screen my-5'>
<form onSubmit={submitHandler} className='p-10 max-w-5xl border-gray-200 shadow-xl rounded-xl'>




            <div className='grid grid-cols-2 gap-3'>
            <div>
                <Label>Title</Label>
                <Input
                type="text"
                name="title"
                value = {input.name}
                onChange={changeEventHandler}
                className='rounded focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                />
            </div>

            <div>
                <Label>Description</Label>
                <Input
                type="text"
                name="description"
                value = {input.description}
                onChange={changeEventHandler}
                className='rounded focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                />
            </div>
            <div>
                <Label>Requirements</Label>
                <Input
                type="text"
                name="requirements"
                value = {input.requirements}
                onChange={changeEventHandler}
                className='rounded focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                />
            </div>
            <div>
                <Label>Salary</Label>
                <Input
                type="text"
                name="salary"
                value = {input.salary}
                onChange={changeEventHandler}
                className='rounded focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                />
            </div>
            <div>
                <Label>Location</Label>
                <Input
                type="text"
                name="location"
                value = {input.location}
                onChange={changeEventHandler}
                className='rounded focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                />
            </div>
            <div>
                <Label>JobType</Label>
                <Input
                type="text"
                name="jobType"
                value = {input.jobType}
                onChange={changeEventHandler}
                className='rounded focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                />
            </div>
            <div>
                <Label>Experience</Label>
                <Input
                type="text"
                name="experience"
                value = {input.experience}
                onChange={changeEventHandler}
                className='rounded focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                />
            </div>

            <div>
                <Label>No. of Position</Label>
                <Input
                type="number"
                name="position"
                value = {input.position}
                onChange={changeEventHandler}
                className='rounded focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                />
            </div>

            {
                companies.length >0 && (
                    <Select onValueChange={selectChangeHandler}>
                    <SelectTrigger className="w-[180px] rounded">
                      <SelectValue placeholder="Select a Company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                      
                        {
                            companies.map((company)=>{
                                return (
                                    
                                    <SelectItem key={company._id} value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                      
                                )
                            })
                        }
                       
                        
                      </SelectGroup>
                    </SelectContent>
                  </Select>
              
                )

            }

            

            </div>
         
            {
            loading ? <Button className="w-full my-4 bg-black text-white rounded"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait...</Button>: <Button type="submit" className="w-full my-4 bg-black rounded text-white">Post Job</Button>

          }

           
            {

                companies.length === 0 && <p className='text-xs text-red-600 font-bold  text-center my-3'>*Please register a company first, before posting a job </p>

            }
            </form>
            
           
        </div>
    </div>
  )
}

export default PostJobs