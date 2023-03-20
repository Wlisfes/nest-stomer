import { h } from 'vue'
import type { MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router'
import { IRouter } from '@/api/fetch-router'
import { useRxicon } from '@/hooks/hook-icon'

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
 * 动态路由树菜单
 * @param data 动态路由树
 */
export function formatter<T extends IRouter>(data: Array<T>) {
    const { Icon, compute } = useRxicon()
    const transfer = <R extends T>(nest: Array<R>) => {
        return nest.map(node => {
            const option: MenuOption = {
                meta: {},
                key: node.path,
                label: () => {
                    if (node.type === 1) {
                        return node.title
                    } else {
                        return h(RouterLink, { to: node.path }, { default: () => node.title })
                    }
                }
            }
            if (node.icon) {
                option.icon = () => {
                    return h(Icon, {
                        size: 20,
                        component: compute(node.icon as never)
                    })
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
