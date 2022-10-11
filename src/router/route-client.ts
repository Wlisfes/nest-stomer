import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/client/Layout.vue'

export const routeClient: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'CHome',
                meta: { title: '主控台' },
                component: () => import('@/views/client/Home.vue')
            }
        ]
    }
]
