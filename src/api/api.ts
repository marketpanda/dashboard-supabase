import axios from "axios"

export async function fetchSample() {
    await new Promise((resolve) => { setTimeout(resolve, 2000)})
    const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_ROOT}/admin`)
    const data = response.data
    return data
}

export async function addPlaceRow(params:any) {
    await new Promise((resolve) => { setTimeout(resolve, 500)})
    console.log(params)
    const singleObject = params
    console.log(singleObject)
    return singleObject
}