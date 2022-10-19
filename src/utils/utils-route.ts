import { RouteRecordRaw } from 'vue-router'
import { IRouter } from '@/api/fetch-router'
import Layout from '@/layout/manager/Layout.vue'

export const page = import.meta.glob('@/views/manager/**/*.vue')

export function formaterTree<T extends IRouter>(data: Array<T>) {
    var map: Record<string, any> = {},
        node: T,
        tree: Array<T> = [],
        i
    for (i = 0; i < data.length; i++) {
        map[data[i].id] = data[i]
        data[i].children = []
    }
    for (i = 0; i < data?.length; i += 1) {
        node = data[i]
        if (node.parent) {
            if (map[node.parent].children) {
                map[node.parent].children.push(node)
            }
        } else {
            tree.push(node)
        }
    }
    return tree
}

export function formatter<T extends IRouter>(data: Array<T>): Array<RouteRecordRaw> {
    return data.map(e => {
        const route: Partial<RouteRecordRaw> = {
            path: e.path,
            name: e.name,
            redirect: e.redirect,
            meta: { title: e.title, icon: e.icon }
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
