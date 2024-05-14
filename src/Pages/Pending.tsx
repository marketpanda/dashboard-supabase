import axios from 'axios'
import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
 

const Pending = () => { 

  const [dataPending, setDataPending] = useState<any>(null)
 
  const [file, setFile] = useState<File | undefined>()
  const [preview, setPreview] = useState<any>(null)

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


  const handleSubmit = (e: React.SyntheticEvent) => { 
    e.preventDefault()
    if (typeof file === 'undefined') return

    const formData = new FormData()

    formData.append('file', file)
    // formData.append('upload_preset', 'test-react-uploads-unsigned')
    // formData.append('api_key', import.meta.env.VITE_APP_CLOUDINARY_KEY)

    // const results = await axios.get('http://fetch...') 
    console.log(file)
  }

  const handleChangeImage = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault() 
    const target = e.target as HTMLInputElement & {
      files: FileList
    }
    setFile(target.files[0])

    const file = new FileReader()

    file.onload = function() {
      console.log('file', file.result)
      setPreview(file.result)
    }

    file.readAsDataURL(target.files[0])

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
                  dataPending?.map((row:any, _:number) => (
                    
                    <TableRow>  

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
              
              <TableRow>
                <TableCell
                  colSpan={9}
                  className='bg-gray-100'>

                  <div className='flex justify-between'>
                    <div className='text-left flex flex-col'>
                      <h1 className='text-xl'>Quirino Grandstand</h1>
                      <span>123 Smart Street</span>
                      <span>Manila</span>
                    </div>
                    <div className='flex gap-2'>
                      <div className='w-[200px]  rounded overflow-hidden border-2 border-dashed border-gray-500 p-1'>

                        <img className='h-full object-cover' src="https://azure.wgp-cdn.co.uk/app-practicalfishkeeping/news/5418677ab76b9.jpg?&width=1200&height=630&mode=crop&format=webp&webp.quality=40&scale=both" alt="Quirino Grandstand" />  
                      </div>
                      <div className='w-[200px] rounded overflow-hidden border-2 border-dashed border-gray-500 p-1'>

                        <img className='h-full object-cover'  src="https://azgardens.com/wp-content/uploads/2017/06/Black-Moor-Goldfish.jpg" alt="Quirino Grandstand" />  
                      </div>
                      <div>
                        <img src={preview} />
                      </div>
                      <div>
                        <form onSubmit={handleSubmit}> 
                          <input
                            type="file"
                            multiple
                            accept="image/png, image/jpg"
                            name="imageUpload"
                            onChange={handleChangeImage} />
                          <input type="submit" value="Upload" className='bg-blue-500 text-white rounded px-3 py-1 flex w-full justify-center mt-2' /> 
                        </form>
                      </div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>

                      
            </TableBody>

          </Table>

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