import { RouteRecordRaw } from 'vue-router'
import Refresh from '@/layout/common/Refresh.vue'

export const routeCommin: Array<RouteRecordRaw> = [
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
