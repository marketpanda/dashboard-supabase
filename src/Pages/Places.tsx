// import React from 'react'

import axios from "axios"
import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"

const Places = () => {

  const [places, setPlaces] = useState(null)

  useEffect(() => {
    const fetchPlaces = async() => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_ROOT}/admin/places`)
        const data = response.data
        if (data) setPlaces(data)
        console.log(data)

        setPlaces(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPlaces()
  
  }, [])

  return (
    <>
      <div>Places</div>
      {
        places &&  <>
        <Table>
         <TableHeader>
           <TableRow>
             <TableHead>Checked</TableHead>
             <TableHead>Name of Place</TableHead>
             {/* <TableHead>User Id</TableHead>  */}
             <TableHead>Address</TableHead>
             <TableHead>Type</TableHead>
             <TableHead>Type Specific</TableHead>
             {/* <TableHead>Location</TableHead> */}
             <TableHead>City Province</TableHead>
             <TableHead>City ID</TableHead>
             <TableHead className='w-[500px]'>Description</TableHead>
             <TableHead>Email</TableHead>
             <TableHead>Website and/or FbPage </TableHead>
             <TableHead>Landmark</TableHead>
             <TableHead>Must Try</TableHead>
             <TableHead>Store Hours</TableHead> 
             <TableHead>Role</TableHead>
             {/* <TableHead>Img</TableHead>
             <TableHead>Imgs</TableHead> */}
             <TableHead>Coords</TableHead>
             <TableHead>Coords Spatial</TableHead>
             <TableHead>Contact No</TableHead>
             {/*
               name, address, type, location, cityProvince, cityId, description, email, landmark, mustTry, role, img, imgs, coords, coordsSpatial, contactNumber
             */}
           </TableRow>
         </TableHeader> 
         <TableBody>
           {
             places && places.map((row:any, index:number) => (
                 
                 <TableRow onClick={() => console.log('hi')}>  

                   <TableCell>
                     <Input
                       className='flex text-start text-xs w-[20px]'
                       type="checkbox"
                       checked={row.ischecked}
                     
                       />
                   </TableCell>
                   <TableCell><Input onClick={(e) => e.stopPropagation()} className='flex text-start text-xs w-[100px]' value={row.name}  /> </TableCell>
                   
                   <TableCell><Input onClick={(e) => e.stopPropagation()} className='flex text-start text-xs w-[100px]' value={row.address}    /> </TableCell>
                   <TableCell><Input onClick={(e) => e.stopPropagation()} className='flex text-start text-xs w-[100px]' value={row.type}   /> </TableCell>
                   <TableCell><Input onClick={(e) => e.stopPropagation()} className='flex text-start text-xs w-[100px]' value={row.category}   /> </TableCell>
                   
                   <TableCell><Input onClick={(e) => e.stopPropagation()} className='flex text-start text-xs w-[100px]' value={row.cityProvince}   /> </TableCell>
                   <TableCell><Input onClick={(e) => e.stopPropagation()} className='flex text-start text-xs w-[100px]' value={row.cityId}    /> </TableCell>
                   <TableCell><Textarea onClick={(e) => e.stopPropagation()} className='w-[150px]' value={row.description} o /> </TableCell>
                   <TableCell><Input onClick={(e) => e.stopPropagation()} className='flex text-start text-xs w-[100px]' value={row.email}   /> </TableCell>
                   <TableCell><Input onClick={(e) => e.stopPropagation()} className='flex text-start text-xs w-[100px]' value={row.websiteAndorFbPage}    /> </TableCell>
                   <TableCell><Input onClick={(e) => e.stopPropagation()} className='flex text-start text-xs w-[100px]' value={row.landmark}   /> </TableCell>
                   <TableCell><Input onClick={(e) => e.stopPropagation()} className='flex text-start text-xs w-[100px]' value={row.mustTry}   /> </TableCell>
                   <TableCell><Input onClick={(e) => e.stopPropagation()} className='flex text-start text-xs w-[100px]' value={row.storeHours} /> </TableCell>
                   <TableCell><Input onClick={(e) => e.stopPropagation()} className='flex text-start text-xs w-[100px]' value={row.role}    /> </TableCell>
                   <TableCell><Input onClick={(e) => e.stopPropagation()} className='flex text-start text-xs w-[100px]' value={row.coordinates}    /> </TableCell>
                   <TableCell><div className='text-xs'>{JSON.stringify(row.coordsSpatial)}</div></TableCell>
                   <TableCell><Input onClick={(e) => e.stopPropagation()} className='flex text-start text-xs w-[100px]' value={row.contactNo}  /> </TableCell>
                   
                 </TableRow> 
               ))

                
           }

                  
                
           
         </TableBody> 
       </Table>
       
      
     </> 
      }
    </>
  )
}

export default Places