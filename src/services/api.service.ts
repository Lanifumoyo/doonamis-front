import axios from 'axios'
import router from '@/router'

const API_URL = import.meta.env.VITE_API_URL

export function getApiKey() {
  return localStorage.getItem('doonamis_token')
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
})

api.interceptors.request.use(async (config) => {
  const apiKey = getApiKey()
  if (apiKey !== null) {
    config.headers['Authorization'] = `Bearer ${apiKey}`
  }
  return config
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {    
        localStorage.removeItem('doonamis_token')
        router.push({ name: 'Login' })
    }
    return Promise.reject(error)
  }
)

export default api
