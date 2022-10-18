import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/client/Layout.vue'

export const routeClient: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Layout,
        redirect: '/client/master',
        children: [
            {
                path: '/client/master',
                name: 'CHome',
                meta: { white: true },
                component: () => import('@/views/client/Home.vue')
            }
        ]
    }
]
