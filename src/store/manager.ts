import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import { formatter, formaterTree } from '@/utils/utils-route'
import { httpColumnDynamic } from '@/api/fetch-router'

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
    router: Array<any>
}

export const useManager = defineStore({
    id: 'manager',
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
        router: []
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
        setRouter(): Promise<Array<RouteRecordRaw>> {
            return httpColumnDynamic().then(({ data }) => {
                this.router = formatter(formaterTree(data.list))
                return this.router
            })
        }
    }
})
