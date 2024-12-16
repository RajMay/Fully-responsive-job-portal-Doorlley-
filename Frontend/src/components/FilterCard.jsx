import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setsearchQuery } from '@/redux/jobSlice'



const filterData = [
  {
    filterType:"Location",
    array:["Kolkata","Banglore","Pune", "Hydrabad","Delhi"]
  },
  {
    filterType:"Industry",
    array:["IT","Finance","Healthcare","Education"]
    
  },
  {
    filterType:"Salary",
    array:["Below 5L","5L-10L","10L-20L"]
    
  },

]

const FilterCard = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const changeHandler = (value)=>{
    setInput(value);
  }

  useEffect(() => {
    dispatch(setsearchQuery(input));
   
  
    
  }, [input])
  
  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3' />
      <RadioGroup value ={input} onValueChange={changeHandler}>
        {
          filterData.map((data, index) => (
            <div>
              <h1 className='font-bold text-lg text-[#7209B7]'>{data.filterType}</h1>
              {
                data.array.map((item, idx) => {
                  const itemId = `id${index}-${idx}`                 //
                  return (

                    <div className='flex item-center space-x-2 my-2'>
                      <RadioGroupItem id={itemId}  value={item}

                      />
                      <Label htmlFor={itemId} >{item}</Label>

                      
                      </div>
                  )
                }



                
              )
              }
            </div>

          )
        )
}
            
            
      </RadioGroup>

    </div>
  )
}

export default FilterCard