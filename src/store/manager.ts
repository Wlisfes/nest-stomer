import { defineStore } from 'pinia'
import { MenuOption } from 'naive-ui'
import { formatter, formaterTree, bfs } from '@/utils/utils-route'
import { httpDynamic, IRouter } from '@/api/fetch-router'

export interface RState {
    device: string
    width: number
    current: string
    expanded: Array<string>
    collapse: boolean
    theme: string
    inverted: string
    primaryColor: string
    reload: boolean
    breadcr: boolean
    better: boolean
    router: Array<IRouter>
    menu: Array<MenuOption>
}

export const useManager = defineStore({
    id: 'manager',
    persist: {
        enabled: true,
        strategies: [
            { storage: localStorage, paths: ['theme', 'inverted', 'primaryColor', 'reload', 'breadcr', 'better'] }
        ]
    },
    state: (): RState => ({
        device: 'PC',
        width: 0,
        current: '',
        expanded: [],
        collapse: false,
        theme: 'light',
        inverted: 'light',
        primaryColor: '#18a058',
        reload: true,
        breadcr: true,
        better: true,
        router: [],
        menu: []
    }),
    actions: {
        setDevice(device: string): void {
            this.device = device
        },
        setWidth(width: number) {
            this.width = width
        },
        setCurrent(current: string) {
            //@ts-ignore
            const route = bfs(this.menu, current)
            this.current = current
        },
        setExpanded(expanded: string[]) {
            this.expanded = expanded
        },
        setCollapse(collapse: boolean) {
            this.collapse = collapse
        },
        setTheme(theme: string) {
            this.theme = theme
        },
        setInverted(inverted: 'dark' | 'light' | 'nav-dark') {
            this.inverted = inverted
        },
        setPrimaryColor(primaryColor: string) {
            this.primaryColor = primaryColor
        },
        setReload(reload: boolean) {
            this.reload = reload
        },
        setBreadcr(breadcr: boolean) {
            this.breadcr = breadcr
        },
        setBetter(better: boolean) {
            this.better = better
        },
        setRouter(): Promise<Array<IRouter>> {
            return httpDynamic().then(({ data }) => {
                this.router = data.list
                this.menu = formatter(formaterTree(data.list))
                return data.list
            })
        }
    }
})
