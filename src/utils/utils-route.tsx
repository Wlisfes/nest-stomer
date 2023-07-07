import type { MenuOption } from 'naive-ui'
import type { IRoute } from '@/api/http-route'
import { h } from 'vue'
import { RouterLink } from 'vue-router'

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
