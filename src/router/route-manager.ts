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
                meta: { title: '主控台', Authorize: true },
                component: () => import('@/views/manager/basic/Master.vue')
            },
            {
                path: '/manager/system/user',
                name: 'User',
                meta: { title: '用户管理', Authorize: true },
                component: () => import('@/views/manager/system/User.vue')
            },
            {
                path: '/manager/system/router',
                name: 'Router',
                meta: { title: '路由管理', Authorize: true },
                component: () => import('@/views/manager/system/Router.vue')
            }
        ]
    }
]
