import { request } from '@/utils/utils-request'
import { ICommon, RCommon } from '@/interface/fetch-core'

export interface IRouter extends ICommon {
    base: number
    type: number
    title: string
    name: string
    status: number
    path: string
    component: string
    redirect: string
    icon: string
    parent: string
    children: Array<IRouter>
}

/**动态路由节点**/
export function httpDynamic() {
    return request<{ list: Array<IRouter> }>({
        url: `/api/router/dynamic`,
        method: 'GET'
    })
}
