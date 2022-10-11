import type { App } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { routeClient } from '@/router/route-client'
import { routeManager } from '@/router/route-manager'

const routes: Array<RouteRecordRaw> = [...routeClient, ...routeManager]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export function setupRouter(app: App<Element>) {
    app.use(router)
    // setupGuardRouter(router)
}

export default router
