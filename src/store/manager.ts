import type { MenuOption } from 'naive-ui'
import { defineStore } from 'pinia'
import { httpDynamicRoute, type IRoute } from '@/api/http-route'
import { formatter } from '@/utils/utils-route'

export interface IManager {
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
    router: Array<IRoute>
    menu: Array<MenuOption>
}

export const useManager = defineStore({
    id: 'manager',
    state: (): IManager => ({
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
            this.current = current
        },
        setExpanded(expanded: string[]) {
            // this.expanded = expanded
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
        httpRouter(): Promise<Array<IRoute>> {
            return httpDynamicRoute().then(({ data }) => {
                //@ts-ignore
                this.menu = formatter(data.list)
                this.router = data.list
                return this.router
            })
        }
    }
})
