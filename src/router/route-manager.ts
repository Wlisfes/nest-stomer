import { RouteRecordRaw } from 'vue-router'

export const routeManager: Array<RouteRecordRaw> = [
    {
        path: '/manager',
        component: () => import('@/layout/manager/Layout.vue'),
        redirect: '/manager/master',
        children: [
            {
                path: '/manager/master',
                name: 'Master',
                meta: { title: '主控台', Authorize: true },
                component: () => import('@/views/manager/basic/Master.vue')
            }
        ]
    },
    {
        path: '/manager/system',
        component: () => import('@/layout/manager/Layout.vue'),
        redirect: '/manager/system/user',
        children: [
            {
                path: '/manager/system/user',
                name: 'User',
                meta: { title: '用户管理', Authorize: true },
                component: () => import('@/views/manager/system/User.vue')
            },
            {
                path: '/manager/system/route',
                name: 'Route',
                meta: { title: '路由管理', Authorize: true },
                component: () => import('@/views/manager/system/Route.vue')
            },
            {
                path: '/manager/system/chacter',
                name: 'Chacter',
                meta: { title: '字典管理', Authorize: true },
                component: () => import('@/views/manager/system/Chacter.vue')
            }
        ]
    },
    {
        path: '/manager/cloud',
        component: () => import('@/layout/manager/Layout.vue'),
        redirect: '/manager/cloud/similar',
        children: [
            {
                path: '/manager/system/similar',
                name: 'Similar',
                meta: { title: '分类管理', Authorize: true },
                component: () => import('@/views/manager/cloud/Similar.vue')
            }
        ]
    }
]
