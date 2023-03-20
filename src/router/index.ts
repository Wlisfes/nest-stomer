import type { App } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw, RouteRecordName, Router } from 'vue-router'
import { routeClient } from '@/router/route-client'
import { routeManager } from '@/router/route-manager'
import { routeCompute } from '@/router/route-compute'
import { useManager } from '@/store/manager'
import { getSession, delSession } from '@/utils/utils-cookie'

const routes: Array<RouteRecordRaw> = [...routeClient, ...routeManager, ...routeCompute]

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

/**注册动态路由**/
async function mountRouter(data: Array<RouteRecordRaw>) {
    const transfer = (parentName: RouteRecordName | null, list: Array<RouteRecordRaw>) => {
        if (parentName) {
            list.forEach(route => {
                router.addRoute(parentName, route)
                if (route.children?.length) {
                    transfer(route.name ?? null, route.children)
                }
            })
        } else {
            list.forEach(route => {
                router.addRoute(route)
                if (route.children?.length) {
                    transfer(route.name ?? null, route.children)
                }
            })
        }
    }
    return transfer(null, data)
}

/**路由守卫**/
export function setupGuardRouter(router: Router) {
    const manager = useManager()
    router.beforeEach(async (to, form, next) => {
        window.$loading.start()
        const AUTH = getSession()

        console.log(AUTH)

        if (AUTH) {
            const refresh = manager.router.length === 0
            if (refresh) {
                try {
                    await manager.setRouter()
                } catch (e) {
                    await delSession()
                    return next({ path: '/compute', replace: true })
                }
            }
            //     if (to.meta?.cannot) {
            //         return next({ path: '/', replace: true })
            //     } else if (refresh) {
            //         return next({
            //             path: `/refresh`,
            //             query: { target: to.path },
            //             replace: true
            //         })
            //     } else {
            //         return next()
            //     }
        } else {
            //     if (to.name === '404' || !(to.meta?.white || to.meta?.cannot)) {
            //         return next({ path: '/compute', replace: true })
            //     } else {
            //         return next()
            //     }
        }

        return next()
    })

    router.afterEach((to, form) => {
        window.$loading.finish()
        manager.setCurrent(to.path)
    })
}

export function setupRouter(app: App<Element>) {
    app.use(router)
    setupGuardRouter(router)
}

export default router
