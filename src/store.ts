import axios from 'axios'
import { create } from 'zustand'

type Image = { id: string, images: any, uploadedImages?: string }    

type imageStore = {
    imgs: Image[],
    insertImagesFromARow: (id: string, pendingImages: string[]) => void,
    updateRowSuccessfulImageUpload: (id: string | number, secureUrlCloudinary: string[]) => Promise<void>,
    clearImagesInARow: (id: string) => void,
    echoSample: (imageArray: any, id: string) => void,
}

export const useImageStore = create<imageStore>((set) => ({
    imgs: [],
    insertImagesFromARow: (id, pendingImages) => {
        const newObject = { id: id, images: pendingImages }
        
        
        set((state: any) => {
            const index = state.imgs.findIndex((item:Image) => item.id === id)

            if (index !== -1) {
                const updatedImg = state.imgs.map((item:Image) => {
                    item.id === id ? { ...item, images: pendingImages} :
                    item
                })

                return  { imgs: updatedImg }
            } else {
                return {
                    imgs: [...state.imgs, newObject]
                }
            }
        })
        
        
        // set((state) => ({ 
        //     imgs: [...state.imgs, newObject]
        // }))

        set((state) => {
            console.log(state.imgs)
            return state
        })
            
    },

    updateRowSuccessfulImageUpload: async(id, secureUrlsCloudinary) => {

        try {

            const uploadRowData = {
                id: id,
                secureUrlsCloudinary: secureUrlsCloudinary
            }

            const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_ROOT}/admin/singleRowLinksUpdate`, uploadRowData)
            const data = response.data
            
            set((state:any) => {
                const rowToUpdate = state.imgs.find((item:Image) => item.id === id)
                const updatedImgs = state.imgs.map((item:Image) => (
                    item.id === id ? {
                        ...rowToUpdate, updatedImgs: secureUrlsCloudinary, data: data
                    }: item
                ))
    
                return { ...state, imgs: updatedImgs }
            }) 

        } catch (error) {
            console.log(error)
        }
        
    },

    echoSample: (str: any, id: string | number) => {
        console.log(str)
        console.log(id)
    },

    clearImagesInARow: (id:string) => {
        set((state) => { 
            const filterRows = state.imgs.filter((item:Image) => item.id !== id)
            console.log(filterRows)
            return  { imgs: filterRows }  
        })  
    },
}))