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
interface IProps {
    IRegister: Pick<IUser, 'nickname' | 'password' | 'mobile'> & {
        code: string
    }
}

/**注册**/
export function httpRegister(data: Pick<IProps, 'IRegister'>) {
    return request<IUser>({ url: `/api/user/register`, method: 'POST', data })
}
