import { RouteRecordRaw } from 'vue-router'
import router from '@/router'
import Layout from '@/layout/manager/Layout.vue'

export function useViewpath() {
    return import.meta.glob('@/views/manager/**/*.vue')
}

export function formatter(data: Array<any>): Array<RouteRecordRaw> {
    return data.map(route => {
        if (route.component === 'Layout') {
            route.component = Layout
        } else {
            route.component = () => import.meta.glob('@/views/manager/**/*.vue')[route.component]
        }

        if (route.children?.length > 0) {
            route.children = formatter(route.children)
        }

        return route as RouteRecordRaw
    })
}
