import { defineStore } from 'pinia'
import router from '@/router'
import Layout from '@/layout/manager/Layout.vue'

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
                    component: 'Layout',
                    redirect: '/manager/master',
                    children: [
                        {
                            path: '/manager/master',
                            name: 'MMaster',
                            meta: { title: '主控台' },
                            component: '/manager/Home'
                        }
                    ]
                },
                {
                    path: '/manager/system',
                    component: 'Layout',
                    redirect: '/manager/system/user',
                    children: [
                        {
                            path: '/manager/system/user',
                            name: 'MUser',
                            meta: { title: '用户' },
                            component: '/manager/user'
                        },
                        {
                            path: '/manager/system/role',
                            name: 'MRole',
                            meta: { title: '角色' },
                            component: '/manager/role'
                        }
                    ]
                }
            ]

            router.addRoute({
                path: '/manager',
                component: Layout
            })

            // router.addRoute({
            //     path: '/manager',
            //     component: Layout
            // redirect: '/manager/master',
            // children: [
            //     {
            //         path: '/manager/master',
            //         name: 'MMaster',
            //         meta: { title: '主控台' },
            //         component: () => import('@/views/manager/Home.vue')
            //     }
            // ]
            // })
            // router.addRoute({ path: '/:manager*', name: '404', redirect: '' })
            // console.log(router.getRoutes())
            return (this.router = routes)
        }
    }
})
