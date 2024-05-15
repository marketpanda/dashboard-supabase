import axios from 'axios'
import {  useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'


//drag and drop
 
import DropZoneandPreview from '../components/DropZoneandPreview'
import { MapPin } from 'lucide-react'

const Pending = () => { 
  type imageUploadRow = {
    id: string,
    name: string,
    userId: number,
    address: string,
    cityProvince: string,
    imgs: string[]
  }

  const [dataPending, setDataPending] = useState<any >(null)  
  const [dataForImageUpload, setDataForImageUpload] = useState<imageUploadRow[] | null>(null) 
 

  
  useEffect(() => {   
    const fetchData = async() => {
      try {        
        const response  = await axios.get(`${import.meta.env.VITE_APP_BACKEND_ROOT}/admin/pendingImageUpload`)
        const data = response.data.data
        
        console.log(data)
        setDataPending(data) 
        
      } catch (error) {
        console.log(error)
      }

    } 
    fetchData()  
  }, [])

  useEffect(() => {
    const getRowsForImageUpload = () => {
      if (!dataPending) return

      const dataRowsFiltered = dataPending.map((dataRow:imageUploadRow) => ({ 
        id: dataRow.id,
        name: dataRow.name,
        userId: dataRow.userId,
        address: dataRow.address,
        cityProvince: dataRow.cityProvince,
        imgs: []
      }))
 
      setDataForImageUpload(dataRowsFiltered)
    }

    getRowsForImageUpload()

  }, [dataPending])

  const handleRowUpload = async(preview:any) => {
    
    console.log(preview)
    console.log(typeof preview)
    
    const body = new FormData()
    body.append("upload_preset", import.meta.env.VITE_APP_CLOUDINARY_PRESET)
    body.append("cloud_name", import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME)

    console.log(body)

    preview.forEach((file:any) => {
      body.append('file', file.file)
    })


    // const handleAddPlaceForm = async (event) => { 
   
    
    //     const body = new FormData()
      
    //     console.log(event.imgs[0])
    
    //     body.append("upload_preset", process.env.VUE_APP_CLOUDINARY_PRESET)
    //     body.append("cloud_name", process.env.VUE_APP_CLOUDINARY_CLOUD_NAME)
    
        
    //     event.imgs.forEach((file) => {
    //         body.append('file', file.file)
    //     }) 
    
    //     const varEndPoint = getVariableEndPoint(data.value.type)
      
        
    //     try {
    
    //         const res2 = await fetch('https://api.cloudinary.com/v1_1/marketpanda/image/upload', {
    //             method: 'POST',
    //             body: body
    //         })
    
    //         const data2 = await res2.json()  
    //         const cloudinaryResult = data2.secure_url
    //         imageCirlce.value = cloudinaryResult
        
    //         data.value.img = cloudinaryResult
    //         //we stringify arrayed cloudinaryResult for it to be accepted in db
    //         const imgsArray = []
    //         imgsArray.push(cloudinaryResult)
    //         data.value.imgs = JSON.stringify(imgsArray)
    
    //         //coords is an array, so we stringify it to be accepted in db
    //         data.value.coords = JSON.stringify(data.value.coords)
    
          
    //         const res = await axios.post(varEndPoint, data.value) 
    //         const getData = res.data
          
    
    //         if (res.status === 200) {
                
    //             submitted.value = true
    //         } else {
    //             console.log(res.statusText)
    //         } 
            
    
    //         const newData =  data.value.imgs  
            
    
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }














  }
 
 
  return (
    <>
      
      <div>

      <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                
                <TableHead>Add Pics</TableHead>
                <TableHead>Address</TableHead>
                
                <TableHead>City Province</TableHead>
                
                <TableHead>Description</TableHead>
                
                <TableHead>Img</TableHead>
                <TableHead>Imgs</TableHead>
                <TableHead>Coords</TableHead>
                <TableHead>Coords Spatial</TableHead>
               
              </TableRow>
            </TableHeader> 
            <TableBody>

              
              {  
                dataPending ? 
                  dataPending?.map((row:any, i:number) => (
                    
                    <TableRow key={i}>  

                      <TableCell>
                      <div>{ row.name }</div> 
                      </TableCell>
                      
                      <TableCell>
                     
                      </TableCell>
                      <TableCell>
                        <div>{ row.address }</div> 
                      </TableCell>
                      <TableCell>
                        <div>{ row.cityProvince }</div> 
                      </TableCell>
                      <TableCell>
                        <div>{ row.description }</div> 
                      </TableCell>
                      
                      <TableCell>
                        <div>img</div> 
                      </TableCell>
                      <TableCell>
                        <div>imgs</div> 
                      </TableCell>
                      <TableCell>
                        <div>coords</div> 
                      </TableCell>
                      <TableCell>
                        <div>coordsSpatial</div> 
                      </TableCell> 
                    </TableRow> 
                  ))

                :

                ""
 
              } 
              
               
               

              {
                dataForImageUpload ?
                dataForImageUpload?.map((forImageUploadRow:imageUploadRow, index:number) => (
                  <TableRow>

                    <TableCell
                    colSpan={9}
                    className={index % 2 === 0 ? 'bg-gray-100': 'bg-gray-50'}>

                      <div className='flex justify-between'>
                        <div className='text-left flex flex-col'>
                          <h1 className='text-xl font-semibold cursor-default text-slate-800'>{ forImageUploadRow.name }</h1>
                          <div className='flex gap-2 items-center text-xs mt-2 text-slate-800'>
                            <MapPin size={21  } />
                            <div className='flex flex-col'>
                              <span>{ forImageUploadRow.address }</span> 
                              <span>{ forImageUploadRow.cityProvince }</span>  
                            </div>
                          </div>
                        </div>
                        
                        <DropZoneandPreview onDragImageOnRow={ handleRowUpload } />
                      </div>
                    </TableCell>
                  </TableRow>
                )) :
                (
                  <TableRow>
                    <TableCell colSpan={9}>
                      <div>Getting Rows</div>
                    </TableCell>
                  </TableRow>
                )
              }



                      
            </TableBody>

          </Table>

      </div>
      <div>
        {
          dataForImageUpload ? <pre className='text-left text-xs'>{JSON.stringify(dataForImageUpload, null, 2)}</pre> : <div>Loading...</div>
        }
      </div>
      <div>
        {
          dataPending ? <pre className='text-left text-xs'>{JSON.stringify(dataPending, null, 2)}</pre> : <div>Loading...</div>
        }
      </div>
    
    </>
  )
}

export default Pending