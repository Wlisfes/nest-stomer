import type { MenuOption } from 'naive-ui'
import type { IRoute } from '@/api/http-route'
import { RemixUI, type INameUI } from '@/utils/utils-remix'
import { h, Fragment } from 'vue'
import { RouterLink } from 'vue-router'

/**动态路由树菜单**/
export function formatter<T extends IRoute>(data: Array<T>) {
    const transfer = <R extends T>(nest: Array<R>) => {
        return nest.map(node => {
            const option: MenuOption = {
                meta: {},
                key: node.path,
                label: () => {
                    return node.source === 'folder' ? (
                        <Fragment>{node.title}</Fragment>
                    ) : (
                        <Fragment>{h(RouterLink, { to: node.path }, { default: () => node.title })}</Fragment>
                    )
                }
            }

            if (node.icon) {
                option.icon = () => {
                    return h(<n-icon size={20} component={RemixUI[node.icon as INameUI]}></n-icon>)
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
