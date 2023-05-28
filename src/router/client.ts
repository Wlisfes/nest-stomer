import type { RouteRecordRaw } from 'vue-router'

export const client: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('@/layout/manager-layout.vue'),
        redirect: '/client/master',
        children: [
            {
                path: '/client/master',
                name: 'Home',
                meta: { white: true },
                component: () => import('@/views/Home.vue')
            }
        ]
    }
]
