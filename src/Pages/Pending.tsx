import axios from 'axios'
import {  useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableRow } from '../components/ui/table'

//drag and drop 
import DropZoneandPreview from '../components/DropZoneandPreview'
import { MapPin } from 'lucide-react'
import { Button } from '../components/ui/button'
import { useImageStore } from '../store'
import { Props } from './DashBoardAuthenticated'

const Pending:React.FC<Props> = () => { 
  type imageUploadRow = {
    id: string,
    name: string, 
    userId: number,
    address: string,
    cityProvince: string,
    imgs: string[]
  } 
  
  const [dataPending, setDataPending] = useState<any>(null)  
  const [dataForImageUpload, setDataForImageUpload] = useState<imageUploadRow[] | null>(null) 
  
  useEffect(() => {   
    const fetchData = async() => {
      try {        

        //get listing with no images
        const response  = await axios.get(`${import.meta.env.VITE_APP_BACKEND_ROOT}/admin/pendingImageUpload`)
        const data = response.data.data
       
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
        imgs: [],
        tempImgs: [] // key value to be used for batch upload
      }))
 
      setDataForImageUpload(dataRowsFiltered)
    }

    getRowsForImageUpload()

  }, [dataPending]) 

  const updateStateAfterRowUpload = useImageStore(state => state.updateRowSuccessfulImageUpload)


  const uploadFile = async (file:any, identifier: any) => {
    const body = new FormData()
    body.append("upload_preset", `${import.meta.env.VITE_APP_CLOUDINARY_PRESET_PLACES}`)
    body.append("cloud_name", `${import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME}`)
    body.append('file', file)

    //comment
    
    try {

      const submitPhotosInARow = await fetch('https://api.cloudinary.com/v1_1/marketpanda/image/upload', {
        method: 'POST',
        body: body 
      })

      const data = await submitPhotosInARow.json()

      console.log(data) 
      
      //insert the results to object array of pending entries (no images)
      updateRowWithNewImage(data, identifier)
       
      return data

    } catch (error) { 
      console.log(error )
    }
  }
  

  const updateRowWithNewImage = (result: any, id:any) => {
    const getRow = dataForImageUpload?.find(item => item.id === id)
    if (getRow) {
      const hasExisting = getRow.imgs
      if (!hasExisting || hasExisting.length == 0) {
        // console.log('Could not find row')
        getRow.imgs = [result.secure_url] //cloudinary object
      } else {
        const temp = getRow.imgs
        temp.push(result.secure_url)
      }
  
      setDataForImageUpload((prev:any) => prev.map((item:any) => (
        item.id === id ? getRow : item
      )))
    } else {
      console.log('Could not find row')
    } 
  }

 
  const handleRowUpload = async(preview:any, identifier:number | string) => {     
     
    const uploadPromises = preview.map((file:any, _:number) => uploadFile(file, identifier))
    try {

      const results = await Promise.all(uploadPromises)

      const secureUrls = results.map(item => item.secure_url)
      updateStateAfterRowUpload(identifier, secureUrls)
      console.log('All images uploaded', results)
      

      return results

    } catch (error) {

      console.log(error)

    }

  } 

  //iterates to all rows to upload
  const uploadAndSubmitAllImages = async() => { 
    const getAllPendingImages = useImageStore.getState().imgs
    console.log('uploading images ', getAllPendingImages)

    const uploadPromises = getAllPendingImages.map(({id, images}) => {
      handleRowUpload(images, id)
    })

    try {
      const results = await Promise.all(uploadPromises)
      console.log('All images uploaded ', results)

    } catch (error) {
      console.log('Error uploading images ', error)
    }

  }

  return (
    <>      
      <div>
      <Table>
            {/* <TableHeader>
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
            </TableHeader>  */}
            <TableBody> 
              {/* {  
                dataPending ? 
                  dataPending?.map((row:any, i:number) => ( 
                    <TableRow key={i}>  

                      <TableCell key={i}>
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
              }   */}

              {
                dataForImageUpload ?
                dataForImageUpload?.map((forImageUploadRow:imageUploadRow, index:number) => (
                  <TableRow>

                    <TableCell
                    colSpan={9}
                    className={index % 2 === 0 ? 'bg-gray-100': 'bg-gray-50'}>

                      <div className='flex flex-col gap-2 sm:flex-row sm:justify-between'>
                        <div className='text-left flex flex-col'>
                          <h1 className='text-xl font-semibold cursor-default text-slate-800'>{ forImageUploadRow.name }</h1>
                          <div className='flex gap-2 items-center text-xs mt-2 text-slate-800'>
                            <MapPin size={21} />
                            <div className='flex flex-col'>
                              <span>{ forImageUploadRow.address }</span> 
                              <span>{ forImageUploadRow.cityProvince }</span>  
                            </div>
                          </div>
                        </div>
                        
                        <DropZoneandPreview
                          onDragImageOnRow={ handleRowUpload }
                          identifier={ forImageUploadRow.id }
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                )) :
                ""
              }

              <TableRow>
                <TableCell
                colSpan={9}
                className='bg-lime-500'>
                  <div>
                    <Button onClick={uploadAndSubmitAllImages}>Submit All</Button>
                  </div>
                </TableCell>
              </TableRow> 
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