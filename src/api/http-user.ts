import { request } from '@/utils/utils-request'
import type { Scheme, Result, IColumn } from '@/interface/http-interface'
export interface IUser extends Scheme {
    uid: number
    nickname: string
    password: string
    mobile: string
    avatar: string
    openid: string
}

/**注册**/
export function httpRegister(params: { nickname: string; password: string; mobile: string; code: string }) {
    return request<IUser>({
        url: `/api/user/register`,
        method: 'POST',
        params
    })
}

/**登录**/
export function httpAuthorize(params: { mobile?: string; password?: string; code?: string }) {
    return request<{ token: string; refresh: string; expire: number; message: string }>({
        url: `/api/user/login`,
        method: 'POST',
        params
    })
}

/**用户信息**/
export function httpBasicUser() {
    return request<IUser>({
        url: `/api/user/basic`,
        method: 'GET'
    })
}

/**用户列表**/
export function httpColumnUser(params: Pick<IColumn, 'page' | 'size'>) {
    return request<Result<IUser>>({
        url: `/api/user/column`,
        method: 'GET',
        params
    })
}
