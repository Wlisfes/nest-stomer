import type { RouteRecordRaw } from 'vue-router'

export const client: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/client/master',
        meta: { Authorize: 'NONE' },
        component: () => import('@/layout/manager-layout.vue'),
        children: [
            {
                path: '/client/master',
                name: 'Home',
                meta: { Authorize: 'NONE' },
                component: () => import('@/views/Home.vue')
            }
        ]
    }
]
