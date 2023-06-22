import { request } from '@/utils/utils-request'
import type { Scheme, Result } from '@/api/http-interface'
export interface IRule extends Scheme {
    path: string
    name: string
    method: string
}
export interface IRoute extends Scheme {
    type: string
    title: string
    path: string
    redirect: string
    icon: string
    parent: string
    children: Array<IRoute>
    rule: Array<IRule>
}

/**动态路由菜单**/
export function httpDynamicRoute() {
    return request<Result<IRoute>>({ url: `/api/route/dynamic`, method: 'GET' })
}

/**路由菜单列表**/
export function httpColumnRoute() {
    return request<Result<IRoute>>({ url: `/api/route/column`, method: 'GET' })
}
