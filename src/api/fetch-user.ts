import { request } from '@/utils/utils-request'
import { ICommon } from '@/interface/fetch-core'

export interface IUser extends ICommon {
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
export function httpLogin(data: { mobile: string; password: string; code: string }) {
    return request<{ session: string; seconds: number }>({
        url: `/api/user/login`,
        method: 'POST',
        data
    })
}
