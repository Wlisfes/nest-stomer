import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { getCookie, APP_AUTH_LOCALE } from '@/utils/utils-cookie'

export const request: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
    timeout: 60000
})

const interNotice = (response: AxiosResponse) => {
    const notification = window.$notification
    if (response.data.code !== 200) {
        notification.error({ duration: 2000, title: response.data.message })
        return Promise.reject(response.data)
    }
    return Promise.resolve(response.data)
}

request.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        config.headers['x-locale'] = getCookie(APP_AUTH_LOCALE) || 'cn'
        return config
    },
    (error: AxiosError) => Promise.reject(error)
)

request.interceptors.response.use(
    (response: AxiosResponse) => interNotice(response),
    (error: AxiosError) => Promise.reject(error)
)

export default request
