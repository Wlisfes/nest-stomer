import { request } from '@/utils/utils-request'
import type { Scheme, Result, Notice } from '@/api/http-interface'
export enum IMethod {
    Default = 'default',
    GET = 'info',
    POST = 'success',
    PUT = 'warning',
    DELETE = 'error'
}
export interface IRule extends Scheme {
    path: string
    name: string
    method: keyof typeof IMethod
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
    return request<Result<IRoute>>({
        url: `/api/route/dynamic`,
        method: 'GET'
    })
}

/**路由菜单列表**/
export function httpColumnRoute() {
    return request<Result<IRoute>>({
        url: `/api/route/column`,
        method: 'GET'
    })
}

/**编辑路由状态**/
export function httpRouteTransfer(data: { id: number; status: string }) {
    return request<Notice>({
        url: `/api/route/transfer`,
        method: 'PUT',
        data
    })
}

/**编辑接口规则**/
export function httpUpdateRule(data: { id?: number; status?: string; path?: string; name?: string; method?: string; parent?: number }) {
    return request<Notice>({
        url: `/api/route/update/rule`,
        method: 'PUT',
        data
    })
}
