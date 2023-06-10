import { request } from '@/utils/utils-request'
import type { Scheme, Result } from '@/api/http-interface'
export interface IUser extends Scheme {
    uid: number
    nickname: string
    password: string
    mobile: string
    avatar: string
    openid: string
}

/**注册**/
export function httpRegister(data: { nickname: string; password: string; mobile: string; code: string }) {
    return request<IUser>({
        url: `/api/user/register`,
        method: 'POST',
        data
    })
}

/**登录**/
export function httpLogin(data: { mobile?: string; password?: string; code?: string }) {
    return request<{ token: string; refresh: string; expire: number }>({
        url: `/api/user/login`,
        method: 'POST',
        data
    })
}

/**用户信息**/
export function httpUser() {
    return request<IUser>({
        url: `/api/user/base`,
        method: 'GET'
    })
}
