import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse, AxiosError } from 'axios'
import { storage } from '@/utils/utils-storage'

export const request: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
    timeout: 60000
})

const interNotice = (response: AxiosResponse) => {
    // const notification = window.$notification
    if (response.data.code !== 200) {
        // notification.error({ duration: 2000, title: response.data.message })
        return Promise.reject(response.data)
    }
    return Promise.resolve(response.data)
}

request.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        config.headers['x-token'] = await storage.getStore(storage.APP_AUTH_TOKEN)
        config.headers['x-locale'] = (await storage.getStore(storage.APP_AUTH_LOCALE)) || 'cn'
        return config
    },
    (error: AxiosError) => Promise.reject(error)
)

request.interceptors.response.use(
    (response: AxiosResponse) => interNotice(response),
    (error: AxiosError) => Promise.reject(error)
)

export default request
