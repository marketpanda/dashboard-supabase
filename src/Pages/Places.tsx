// import React from 'react'

import axios from "axios"
import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Input } from "../components/ui/input" 

const Places = () => {

  interface PlaceProps {
    isChecked?: boolean
    name?: string
    address?: string
    type?: string
    category?: string
    cityProvince?: string
    cityId?: number
    description?: string
    email?: string
    websiteAndorFbPage?: string
    landmark?: string
    mustTry?: string
    storeHours?: string
    role?: string
    coordinates?: string
    coordsSpatial?: string
    contactNo?: string

  }
  const [places, setPlaces] = useState<PlaceProps[] | null>(null)

  useEffect(() => {
    const fetchPlaces = async() => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_ROOT}/admin/places`)
        const data = response.data

        if (!data) return
        if (data) setPlaces(data) 

        setPlaces(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPlaces()
  
  }, [])

  return (
    <> 
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
             places && places.map((row:any, _index:number) => {

              const {
                ischecked,
                name,
                address,
                type,
                category,
                cityProvince,
                cityId,
                description,
                email,
                websiteAndorFbPage,
                landmark,
                mustTry,
                storeHours,
                role,
                coordinates,
                coordsSpatial,
                contactNo
              } = row
              return (
                <TableRow onClick={() => console.log('hi')}>  
                  <TableCell><Input
                    className='flex text-start text-xs w-[20px]'
                    type="checkbox"
                    checked={ischecked}
                  />
                  </TableCell>
                  <TableCell>{ name }</TableCell>
                  <TableCell>{ address }</TableCell>
                  <TableCell>{ type }</TableCell>
                  <TableCell>{ category }</TableCell> 
                  <TableCell>{ cityProvince }</TableCell>
                  <TableCell>{ cityId }</TableCell>
                  <TableCell>{ description }</TableCell>
                  <TableCell>{ email }</TableCell>
                  <TableCell>{ websiteAndorFbPage }</TableCell>
                  <TableCell>{ landmark } </TableCell>
                  <TableCell>{ mustTry }</TableCell>
                  <TableCell>{ storeHours }</TableCell>
                  <TableCell>{ role }</TableCell>
                  <TableCell>{ coordinates }</TableCell>
                  <TableCell><div className='text-xs'>{JSON.stringify(coordsSpatial)}</div></TableCell>
                  <TableCell>{ contactNo }</TableCell>
                </TableRow>
              )}
            )} 
           
         </TableBody> 
       </Table>
       
      
     </> 
      }
    </>
  )
}

export default Places