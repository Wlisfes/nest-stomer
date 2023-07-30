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
export function httpRegister(data: { nickname: string; password: string; mobile: string; code: string }) {
    return request<IUser>({
        url: `/api-stomer/user/register`,
        method: 'POST',
        data
    })
}

/**登录**/
export function httpAuthorize(data: { mobile: string; password: string; token: string; session: string }) {
    return request<{ token: string; refresh: string; expire: number; message: string }>({
        url: `/api-stomer/user/authorize`,
        method: 'POST',
        data
    })
}

/**用户信息**/
export function httpBasicUser() {
    return request<IUser>({
        url: `/api-stomer/user/basic`,
        method: 'GET'
    })
}

/**用户列表**/
export function httpColumnUser(params: Pick<IColumn, 'page' | 'size'>) {
    return request<Result<IUser>>({
        url: `/api-stomer/user/column`,
        method: 'GET',
        params
    })
}
