import axios from 'axios'
import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
 

const Pending = () => { 

  const [dataPending, setDataPending] = useState<any>(null)
 

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