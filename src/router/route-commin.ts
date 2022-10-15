import { RouteRecordRaw } from 'vue-router'
import { Compute, Login, Register } from '@/views/pipe'
import { Refresh } from '@/layout/common'

export const routeCommin: Array<RouteRecordRaw> = [
    {
        path: '/compute',
        name: 'Compute',
        component: Compute,
        redirect: '/compute/login',
        children: [
            {
                path: '/compute/login',
                name: 'Login',
                meta: { title: '登录' },
                component: Login
            },
            {
                path: '/compute/register',
                name: 'Register',
                meta: { title: '注册' },
                component: Register
            }
        ]
    },
    {
        path: '/refresh/',
        name: 'Refresh',
        component: Refresh
    },
    {
        path: '/:catch(.*)',
        name: '404',
        props: true,
        component: Refresh
    }
]
