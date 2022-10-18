import type { App } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw, Router } from 'vue-router'
import { routeClient } from '@/router/route-client'
import { routeManager } from '@/router/route-manager'
import { routeCommin } from '@/router/route-commin'
import { useManager } from '@/store/manager'
import { getSession } from '@/utils/utils-cookie'

const routes: Array<RouteRecordRaw> = [...routeClient, ...routeManager, ...routeCommin]

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export function setupGuardRouter(router: Router) {
    const manager = useManager()
    router.beforeEach(async (to, form, next) => {
        const AUTH = getSession()
        if (AUTH) {
            const refresh = manager.router.length === 0
            if (refresh) {
                await manager.setRouter()
            }
            if (to.meta?.cannot) {
                return next({ path: '/', replace: true })
            } else if (refresh) {
                return next({
                    path: `/refresh`,
                    query: Object.assign(to.query, { target: to.path, refresh: true }),
                    replace: true
                })
            } else {
                return next()
            }
        } else {
            if (to.meta?.white || to.meta?.cannot) {
                return next()
            } else {
                return next({ path: '/compute', replace: true })
            }
        }
    })
}

export function setupRouter(app: App<Element>) {
    app.use(router)
    setupGuardRouter(router)
}

export default router
