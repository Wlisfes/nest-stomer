import { request } from '@/utils/utils-request'
import { ICommon, RCommon } from '@/interface/fetch-core'

export interface IRoute extends ICommon {
    type: string
    title: string
    status: number
    path: string
    redirect: string
    icon: string
    parent: string
    children: Array<IRoute>
}

/**路由列表**/
export function httpColumn() {
    return request<RCommon<IRoute>>({ url: `/api/router/column`, method: 'GET' })
}

/**动态路由节点**/
export function httpDynamic() {
    return request<RCommon<IRoute>>({ url: `/api/router/dynamic`, method: 'GET' })
}
