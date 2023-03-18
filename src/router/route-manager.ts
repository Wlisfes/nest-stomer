import { RouteRecordRaw } from 'vue-router'

export const routeManager: Array<RouteRecordRaw> = [
    {
        path: '/manager',
        name: 'Layout',
        component: () => import('@/layout/manager/Layout.vue'),
        redirect: '/manager/master',
        children: [
            {
                path: '/manager/master',
                name: 'Master',
                meta: { title: '主控台' },
                component: () => import('@/views/manager/basic/Master.vue')
            }
        ]
    }
]
