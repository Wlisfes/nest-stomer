import { RouteRecordRaw } from 'vue-router'
import { Compute, Login, Register } from '@/views/pipe'
import { Refresh } from '@/layout/common'

export const routeCompute: Array<RouteRecordRaw> = [
    {
        path: '/compute',
        name: 'Compute',
        component: Compute,
        redirect: '/compute/login',
        children: [
            {
                path: '/compute/login',
                name: 'Login',
                meta: { cannot: true },
                component: Login
            },
            {
                path: '/compute/register',
                name: 'Register',
                meta: { cannot: true },
                component: Register
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
