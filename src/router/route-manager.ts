import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/manager/Layout.vue'

export const routeManager: Array<RouteRecordRaw> = [
    {
        path: '/manager',
        name: 'Layout',
        component: Layout,
        redirect: '/manager/master',
        children: [
            {
                path: '/manager/master',
                name: 'MHome',
                meta: { title: '主控台' },
                component: () => import('@/views/manager/Home.vue')
            }
        ]
    }
]
