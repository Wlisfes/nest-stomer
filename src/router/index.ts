import type { App } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw, Router } from 'vue-router'
import { routeClient } from '@/router/route-client'
import { routeManager } from '@/router/route-manager'
import { useManager } from '@/store/manager'

const routes: Array<RouteRecordRaw> = [...routeClient, ...routeManager]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export function setupGuardRouter(router: Router) {
    const manager = useManager()
    router.beforeEach((to, form, next) => {
        if (!manager.router.length) {
            manager.setRouter().then(() => {
                next({ ...to, replace: true })
            })
        } else {
            next()
        }
    })
}

export function setupRouter(app: App<Element>) {
    app.use(router)
    setupGuardRouter(router)
}

export default router
