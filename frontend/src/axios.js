import axios from 'axios'

const newAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

newAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject(new Error('Server is offline. Please try again later.'))
    }
    return Promise.reject(error)
  }
)

export default newAxios
