import { request } from '@/utils/utils-request'
import { ICommon, RCommon } from '@/interface/fetch-core'

export interface IRouter extends ICommon {
    type: number
    title: string
    status: number
    path: string
    redirect: string
    icon: string
    parent: string
    children: Array<IRouter>
}

/**路由列表**/
export function httpColumn() {
    return request<RCommon<IRouter>>({ url: `/api/router/column`, method: 'GET' })
}

/**动态路由节点**/
export function httpDynamic() {
    return request<RCommon<IRouter>>({ url: `/api/router/dynamic`, method: 'GET' })
}
