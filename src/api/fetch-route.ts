import { request } from '@/utils/utils-request'
import { ICommon, RCommon } from '@/interface/fetch-core'

export interface IRoute extends ICommon {
    type: string
    title: string
    path: string
    redirect: string
    icon: string
    parent: string
    children: Array<IRoute>
}

/**路由列表**/
export function columnRoute() {
    return request<RCommon<IRoute>>({ url: `/api/router/column`, method: 'GET' })
}

/**动态路由节点**/
export function dynamicRoute() {
    return request<RCommon<IRoute>>({ url: `/api/router/dynamic`, method: 'GET' })
}

/**创建路由菜单**/
export function createRoute(data: {
    status: string
    type: string
    title: string | undefined
    path: string | undefined
    redirect?: string
    parent?: number
    icon?: string
}) {
    return request({ method: 'POST', url: `/api/router/create`, data })
}
