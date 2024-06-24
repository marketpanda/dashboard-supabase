
import { create } from 'zustand'

type bulkStatusArray = 'pending' | 'uploading' | 'success'

type BulkStore = {
    bulkStatus: bulkStatusArray
    updateBulkUpload: (id: string) => void
}

export const bulkUploadStore = create<BulkStore>((set) => ({
    bulkStatus: 'pending',
    updateBulkUpload: (id) => {
        console.log(id)
        set((state:any) => {
            return { bulkStatus: 'uploading'}
            console.log(state)
        })
    }

}))