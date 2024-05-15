import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { ImageUp, X } from 'lucide-react'


const DropZoneandPreview = ({ onDragImageOnRow }: {onDragImageOnRow:any}) => {
    type PreviewFile = File & {
        preview: string
    }

    const [preview, setPreview] = useState<PreviewFile[]>([])
    
    const onDrop = useCallback((acceptedFiles:any) => {
      
        setPreview(acceptedFiles.map( (file:any) => 
            Object.assign(file, {
                preview: URL.createObjectURL(file)
            })))

    }, [])

    const handleRemovePic = (picToRemove: PreviewFile) => { 
        setPreview(prev => prev.filter(pic => pic !== picToRemove))
    }

    const clearImages = () => {
        setPreview([])
    }

     

    const { getRootProps, getInputProps, 
        // acceptedFiles
        //  isDragActive
         } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/jpg': [] 
        },
        maxFiles: 20
        })

    // console.log(get  InputProps)
    return (
        <div className='w-2/3 h-[150px] flex justify-between overflow-hidden relative border-2 border-dashed border-opacity-50'>
            <div {...getRootProps()} className='w-full h-full overflow-hidden'>
                <input {...getInputProps()} />
                <div className='flex gap-2 p-2 w-full overflow-x-auto'>

                {
                    preview.length ? 
                    preview.map((img, i:number) => (    
                        <div className='relative w-[200px] h-[100px] overflow-hidden bg-white p-1' onClick={(e) => {e.stopPropagation()}}>
                            <img key={i} className='h-full object-cover' src={img.preview} alt="pic" />  
                            <div className='absolute top-1 right-3 text-gray-500 cursor-pointer w-2 h-2 rounded-full bg-white'
                            onClick={(e) => {
                                //stop popping up the upload window
                                e.stopPropagation()
                                handleRemovePic(img)
                                }}><X size={20} /></div>
                             
                        </div>
                        ))
                    : ""
                } 
                </div>

                         
                
            {
                !preview.length ? 
                <span className='absolute top-1/2 left-1/2 flex gap-2 truncate justify-center transform -translate-x-1/2 -translate-y-1/2 w-[600px]'>
                    <ImageUp color='gray' />
                    <span className='text-gray-500 italic cursor-pointer'>
                        Drag and drop or click this area to upload images
                    </span>
                </span> :    
                ""  
            }
                 
            </div> 


             
            {
                preview.length ? (

                <div className='absolute bottom-2 right-2'>
                    <form className='flex gap-2'>  
                        <input type="submit"
                            onClick={(e) => {
                                e.preventDefault()
                                onDragImageOnRow(preview)
                            }}
                        value="Upload"
                        className='bg-lime-800 text-white font-semibold text-xs rounded px-3 py-1 flex w-[100px] justify-center' /> 
                        <input type="button" onClick={clearImages} value="Clear"
                        className='bg-lime-800 text-white font-semibold text-xs rounded px-3 py-1 flex w-[100px] justify-center' /> 
                         
                    </form>
                </div>

                ) : ""
            } 
           

        </div>
    )
}

export default DropZoneandPreview