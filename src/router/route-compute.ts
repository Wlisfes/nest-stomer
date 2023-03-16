import { RouteRecordRaw } from 'vue-router'
import { Refresh } from '@/layout/common'

export const routeCompute: Array<RouteRecordRaw> = [
    {
        path: '/compute',
        name: 'Compute',
        component: () => import('@/views/pipe/Compute.vue'),
        redirect: '/compute/login',
        children: [
            {
                path: '/compute/login',
                name: 'Login',
                meta: { cannot: true },
                component: () => import('@/views/pipe/Login.vue')
            },
            {
                path: '/compute/register',
                name: 'Register',
                meta: { cannot: true },
                component: () => import('@/views/pipe/Register.vue')
            }
        ]
    },
    {
        path: '/refresh/',
        name: 'Refresh',
        meta: { white: true },
        component: Refresh
    },
    {
        path: '/:catch(.*)',
        name: '404',
        meta: { white: true },
        component: Refresh
    }
]
