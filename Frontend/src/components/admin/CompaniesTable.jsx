

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
    const navigate = useNavigate();


  const { companies = [], searchCompanyByText } = useSelector((store) => store.company);
  const [filtercompany, setfilterCompany] = useState(companies);




  useEffect(() => {
    const filteredCompany = companies.length>=0  && companies.filter((company)=>{
        if(!searchCompanyByText){
            return true
        };
        return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

    });
    setfilterCompany(filteredCompany);
  
   
  }, [companies,searchCompanyByText])
  

  return (
    <div>
      <Table className="bg-slate-50 w-full">
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          { 
            filtercompany.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company?.logo}  />
                  </Avatar>
                </TableCell>
                <TableCell>{company?.name}</TableCell>
                <TableCell>{company?.createdAt.split('T')[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;








// import React from 'react'
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
// import { Avatar, AvatarImage } from '../ui/avatar'
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
// import { Edit2, MoreHorizontal } from 'lucide-react'
// import { useSelector } from 'react-redux'
// import { setCompanies } from '@/redux/companySlice';

// const CompaniesTable = () => {
//     const {companies=[]} = useSelector(store=>store.company);

//   return (
//     <div>
//         <Table className="bg-slate-50">
//             <TableCaption>
// A list of your recent registered companies
//             </TableCaption>
//             <TableHeader>
//                 <TableRow>
//                     <TableHead>Logo</TableHead>
//                     <TableHead>Name</TableHead>
//                     <TableHead>Date</TableHead>
//                     <TableHead className="text-right">Action</TableHead>

                    
//                 </TableRow>
//             </TableHeader>
//             <TableBody>
//                 {
//                     companies.length <= 0 ? <span>You haven't registered any company yet. </span> : 
//                     (
//                         <>
//                         {
//                             companies?.map((company)=>{
//                                 return (
                                   
//                                     <div key={company._id}>
//                                     <TableCell>
//                         <Avatar>
//                         <AvatarImage src="/images/google.png" />

                       
//                         </Avatar>
//                               </TableCell>
//                               <TableCell>  {company.name} </TableCell>
//                               <TableCell>  {company.createdAt.split("T")[0]}</TableCell>
//                               <TableCell className="text-right cursor-pointer"> 
//                      <Popover>        
//                         <PopoverTrigger><MoreHorizontal /></PopoverTrigger>          
                      
//                           <PopoverContent className="w-32">

//                         <div className='flex items-center gap-2 w-fit cursor-pointer'>
//                             <Edit2 className='w-4'/>
//                             <span>Edit</span>
                            
//                         </div>

//                         </PopoverContent>
//                         </Popover> 
//                         </TableCell>
//                                     </div>


                                    
                                    
                                    
                                    
//                                 )
//                             })
//                         }
//                         </>

                        
//                     )
//                 }
                
               
                  
//             </TableBody>
//         </Table>
//     </div>


//   )
// }

// export default CompaniesTable
