import type { MenuOption } from 'naive-ui'
import type { IRouter } from '@/api/fetch-router'
import { h } from 'vue'
import { RouterLink, type RouteRecordRaw } from 'vue-router'
import { Icons, useRxicon } from '@/hooks/hook-icon'
import Layout from '@/layout/manager/Layout.vue'

export const page = import.meta.glob('@/views/manager/**/*.vue')

/**
 * 动态路由转树结构
 * @param data 动态路由
 * @returns 路由树
 */
export function formaterTree<T extends IRouter>(data: Array<T>) {
    const map: Record<string, T> = {}
    const tree: Array<T> = []
    data.forEach(node => {
        map[node.id] = node
        node.children = []
        if (node.parent) {
            map[node.parent].children.push(node)
        } else {
            tree.push(node)
        }
    })
    return tree
}

/**
 * 路由树转化动态路由树
 * @param data 路由树
 * @returns 动态路由树
 */
export function formatter<T extends IRouter>(data: Array<T>): Array<RouteRecordRaw> {
    return data.map(e => {
        const route: Partial<RouteRecordRaw> = {
            path: e.path,
            name: e.name,
            redirect: e.redirect,
            meta: { title: e.title, icon: e.icon, type: e.type }
        }
        if (e.component === 'Layout') {
            route.component = () => Promise.resolve(Layout)
        } else {
            route.component = page[e.component]
        }
        if (e.children.length) {
            route.children = formatter(e.children)
        }
        return route as RouteRecordRaw
    })
}

/**
 * 动态路由树菜单
 * @param data 动态路由树
 */
export function formatterSider<T extends RouteRecordRaw>(data: Array<T>) {
    const { Icon, compute } = useRxicon()
    return data.map(node => {
        const option: MenuOption = {
            meta: node.meta ?? {},
            key: node.path,
            label: () => {
                if (node.meta?.type === 1) {
                    return node.meta?.title
                }
                return h(RouterLink, { to: node.path }, { default: () => node.meta?.title })
            }
        }
        if (node.meta?.icon) {
            option.icon = () => {
                return h(Icon, {
                    size: 20,
                    component: compute(node.meta?.icon as keyof typeof Icons)
                })
            }
        }
        if (node.children?.length) {
            option.children = formatterSider(node.children)
        }
        return option
    })
}
