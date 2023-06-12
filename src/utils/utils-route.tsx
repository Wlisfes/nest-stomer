import type { MenuOption } from 'naive-ui'
import type { IRoute } from '@/api/http-route'
import { h } from 'vue'
import { RouterLink } from 'vue-router'

/**动态路由转树结构**/
export function formaterTree<T extends IRoute>(data: Array<T>) {
    const tree: Array<T> = []
    const map: Record<string, T> = data.reduce((curr, next) => {
        next.children = []
        curr[next.id] = next
        return curr
    }, Object.assign({}))
    data.forEach(node => {
        if (node.parent) {
            map[node.parent].children.push(node)
        } else {
            tree.push(node)
        }
    })
    return tree
}

/**动态路由树菜单**/
export function formatter<T extends IRoute>(data: Array<T>) {
    const transfer = <R extends T>(nest: Array<R>) => {
        return nest.map(node => {
            const option: MenuOption = {
                meta: {},
                key: node.path,
                label: () => {
                    if (node.type === 'directory') {
                        return node.title
                    } else {
                        return h(RouterLink, { to: node.path }, { default: () => node.title })
                    }
                }
            }

            if (node.children?.length) {
                option.children = formatter(node.children)
            }
            return option
        })
    }
    return transfer(data) as Array<MenuOption>
}
