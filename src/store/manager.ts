import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import router from '@/router'
import Layout from '@/layout/manager/Layout.vue'
import { formatter, useViewpath } from '@/utils/utils-route'

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
            return width
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
        async setRouter() {
            const routes = [
                {
                    path: '/manager',
                    name: 'Manager',
                    component: 'Layout',
                    redirect: '/manager/master',
                    children: [
                        {
                            path: '/manager/master',
                            name: 'MHome',
                            meta: { title: '主控台' },
                            component: '/src/views/manager/Home.vue'
                        }
                    ]
                },
                {
                    path: '/manager/system',
                    name: 'System',
                    component: 'Layout',
                    redirect: '/manager/system/user',
                    children: [
                        {
                            path: '/manager/system/user',
                            name: 'MUser',
                            meta: { title: '用户' },
                            component: '/src/views/manager/Home.vue'
                        },
                        {
                            path: '/manager/system/role',
                            name: 'MRole',
                            meta: { title: '角色' },
                            component: '/src/views/manager/Home.vue'
                        },
                        {
                            path: '/manager/system/router',
                            name: 'MRouter',
                            meta: { title: '路由' },
                            component: '/src/views/manager/system/Router.vue'
                        }
                    ]
                }
            ]

            routes.forEach(route => {
                if (route.component === 'Layout') {
                    router.addRoute({
                        name: route.name,
                        path: route.path,
                        redirect: route.redirect,
                        component: Layout
                    } as RouteRecordRaw)
                } else {
                    router.addRoute({
                        name: route.name,
                        path: route.path,
                        redirect: route.redirect,
                        component: import.meta.glob('@/views/manager/**/*.vue')[route.component]
                    } as RouteRecordRaw)
                }

                route.children?.forEach(x => {
                    if (!router.hasRoute(x.name)) {
                        router.addRoute(route.name, {
                            path: x.path,
                            name: x.name,
                            meta: x.meta,
                            component: import.meta.glob('@/views/manager/**/*.vue')[x.component]
                        })
                    }
                })
            })

            return (this.router = routes)
        }
    }
})
