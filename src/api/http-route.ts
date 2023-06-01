import { request } from '@/utils/utils-request'
import type { Scheme, Result } from '@/api/http-interface'
export interface IRoute extends Scheme {
    type: string
    title: string
    path: string
    redirect: string
    icon: string
    parent: string
    children: Array<IRoute>
}

/**动态路由菜单**/
export function httpDynamicRoute() {
    return request<Result<IRoute>>({ url: `/api/router/dynamic`, method: 'GET' })
}
