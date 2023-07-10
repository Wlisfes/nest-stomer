import { request } from '@/utils/utils-request'
import type { Scheme, Result, Notice } from '@/interface/http-interface'
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
    parent: IRoute
    method: keyof typeof IMethod
}
export interface IRoute extends Scheme {
    type: string
    title: string
    path: string
    redirect: string
    icon: string
    order: number
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

/**路由信息**/
export function httpBasicRoute(params: Pick<IRoute, 'id'>) {
    return request<IRoute>({
        url: `/api/route/basic`,
        method: 'GET',
        params
    })
}

/**编辑路由**/
export function httpUpdateRoute(
    data: Pick<IRoute, 'id' | 'status' | 'type' | 'title' | 'order' | 'path'> & Partial<Pick<IRoute, 'redirect' | 'icon' | 'parent'>>
) {
    return request<Notice>({
        url: `/api/route/update`,
        method: 'PUT',
        data
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

/**新增接口规则**/
export function httpCreateRule(data: { status: string; path: string; name: string; method: string; parent: number }) {
    return request<Notice>({
        url: `/api/route/create/rule`,
        method: 'POST',
        data
    })
}

/**编辑接口规则**/
export function httpUpdateRule(data: { id: number; status: string; path: string; name: string; method: string; parent: number }) {
    return request<Notice>({
        url: `/api/route/update/rule`,
        method: 'PUT',
        data
    })
}

/**接口规则信息**/
export function httpBasicRule(params: { id: number }) {
    return request<IRule>({
        url: `/api/route/rule/basic`,
        method: 'GET',
        params
    })
}

/**编辑规则状态**/
export function httpRuleTransfer(data: { id: number; status: string }) {
    return request<Notice>({
        url: `/api/route/transfer/rule`,
        method: 'PUT',
        data
    })
}
