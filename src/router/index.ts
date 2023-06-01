import type { App } from 'vue'
import type { RouteRecordRaw, Router } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { client } from '@/router/client'
import { manager } from '@/router/manager'
import { useManager } from '@/store/manager'
import { cookie } from '@/utils/utils-cookie'
export const routes: Array<RouteRecordRaw> = client.concat(manager)

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

/**路由守卫**/
export function setupGuardRouter(router: Router) {
    const store = useManager()
    router.beforeEach(async (to, form, next) => {
        const token = await cookie.getStore(cookie.APP_AUTH_TOKEN, 'token')
        if (token) {
            const isRefresh = store.router.length === 0
            if (isRefresh) {
                await store.httpRouter().catch(async e => {
                    await cookie.delStore(cookie.APP_AUTH_TOKEN)
                    return next()
                })
            }
        }
        return next()
    })

    router.afterEach((to, form) => {
        // window.$loading.finish()
    })
}

export function setupRouter(app: App<Element>) {
    app.use(router)
    setupGuardRouter(router)
}

export default router
