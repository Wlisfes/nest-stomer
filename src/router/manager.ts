import type { RouteRecordRaw } from 'vue-router'

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
                component: () => import('@/views/Home.vue')
            }
        ]
    }
]
