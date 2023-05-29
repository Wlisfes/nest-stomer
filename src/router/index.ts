import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { client } from '@/router/client'
import { manager } from '@/router/manager'
export const routes: Array<RouteRecordRaw> = client.concat(manager)

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router

export function setupRouter(app: App<Element>) {
    app.use(router)
    // setupGuardRouter(router)
}
