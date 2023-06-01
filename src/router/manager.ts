import { RouterView, type RouteRecordRaw } from 'vue-router'

export const manager: Array<RouteRecordRaw> = [
    {
        path: '/manager',
        component: () => import('@/layout/manager-layout.vue'),
        redirect: '/manager/master',
        children: [
            {
                path: '/manager/master',
                name: 'Master',
                meta: { title: '主控台', Authorize: true },
                component: () => import('@/views/manager/master.vue')
            },
            {
                path: '/manager/system',
                redirect: '/manager/system/user',
                name: 'System',
                meta: { title: '主控台', Authorize: true },
                component: RouterView,
                children: [
                    {
                        path: '/manager/system/user',
                        name: 'User',
                        meta: { title: '主控台', Authorize: true },
                        component: () => import('@/views/manager/system/user.vue')
                    },
                    {
                        path: '/manager/system/chacter',
                        name: 'Chacter',
                        meta: { title: '主控台', Authorize: true },
                        component: () => import('@/views/manager/system/chacter.vue')
                    },
                    {
                        path: '/manager/system/route',
                        name: 'Route',
                        meta: { title: '主控台', Authorize: true },
                        component: () => import('@/views/manager/system/route.vue')
                    }
                ]
            }
        ]
    }
]
