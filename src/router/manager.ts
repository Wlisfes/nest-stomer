import { RouterView, type RouteRecordRaw } from 'vue-router'

export const manager: Array<RouteRecordRaw> = [
    {
        path: '/manager',
        redirect: '/manager/master',
        name: 'Manager',
        meta: { title: { cn: '', en: '' }, Authorize: 'AUTH' },
        component: () => import('@/layout/manager-layout.vue'),
        children: [
            {
                path: '/manager/master',
                name: 'Master',
                meta: { title: '主控台', Authorize: 'AUTH' },
                component: () => import('@/views/manager/master.vue')
            },
            {
                path: '/manager/system',
                redirect: '/manager/system/user',
                name: 'System',
                meta: { title: '主控台', Authorize: 'AUTH' },
                component: RouterView,
                children: [
                    {
                        path: '/manager/system/user',
                        name: 'User',
                        meta: { title: '主控台', Authorize: 'AUTH' },
                        component: () => import('@/views/manager/system/user.vue')
                    },
                    {
                        path: '/manager/system/chacter',
                        name: 'Chacter',
                        meta: { title: '主控台', Authorize: 'AUTH' },
                        component: () => import('@/views/manager/system/chacter.vue')
                    },
                    {
                        path: '/manager/system/route',
                        name: 'Route',
                        meta: { title: '主控台', Authorize: 'AUTH' },
                        component: () => import('@/views/manager/system/route.vue')
                    }
                ]
            }
        ]
    }
]
