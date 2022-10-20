import type { MenuOption } from 'naive-ui'
import type { IRouter } from '@/api/fetch-router'
import { h } from 'vue'
import { RouterLink, type RouteRecordRaw, type RouteMeta } from 'vue-router'
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
            meta: e as RouteMeta
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
    const transfer = <R extends T>(nest: Array<R>) => {
        return nest.map(node => {
            const option: MenuOption & { meta?: RouteMeta } = {
                meta: node.meta,
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

    return transfer(data).reduce((current, next) => {
        if (next.meta?.base) {
            current = current.concat(next.children as Array<never>)
        } else {
            current.push(next as never)
        }
        return current
    }, []) as Array<MenuOption>
}

export function bfs<T extends MenuOption>(target: T[], path: string, children = 'children'): T | undefined {
    const quene = [...target]
    do {
        const current = quene.shift()
        if (current?.[children]) {
            const node = ((current[children] || []) as Array<T>).map(x => {
                return {
                    ...x,
                    current: (current.current || current.key) + '~' + x.key
                }
            })
            quene.push(...node)
        }
        if (current?.key === path) {
            return { ...current }
        }
    } while (quene.length)
    return undefined
}
