import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { cookie } from '@/utils/utils-cookie'

export interface Response<T = unknown> {
    data: T
    code: number
    message: string
    timestamp: string
    method: string
    url: string
}

interface Request extends AxiosInstance {
    <T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R & Response<T>>
    <T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R & Response<T>>
}

export const baseURL = import.meta.env.VITE_API_BASE
export const request: Request = axios.create({
    baseURL,
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
    (config: InternalAxiosRequestConfig) => {
        config.headers['x-token'] = cookie.getStore(cookie.APP_AUTH_TOKEN)
        config.headers['x-locale'] = cookie.getStore(cookie.APP_AUTH_LOCALE, { value: 'cn' })
        return config
    },
    error => Promise.reject(error)
)

request.interceptors.response.use(
    (response: AxiosResponse) => interNotice(response),
    error => Promise.reject(error)
)

/**请求错误捕获**/
export function createRequest<T>(httpCallBack: Function, isReject: boolean = true): Promise<T> {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await httpCallBack())
        } catch (e) {
            isReject && reject(e)
        }
    })
}
