import axios from 'axios'

export const axiosclient=axios.create({
    baseURL:'http://127.0.0.1:5000',
    withCredentials: true,
})