import type { App } from 'vue'
import type { RouteRecordRaw, Router } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { client } from '@/router/client'
import { manager } from '@/router/manager'
import { useManager } from '@/store/manager'
import { cookie } from '@/utils/utils-cookie'
export const routes: Array<RouteRecordRaw> = client.concat([
    ...manager,
    {
        path: '/compute',
        redirect: '/compute/login',
        name: 'Compute',
        meta: { Authorize: 'AUTH_NONE' },
        component: () => import('@/views/middle/compute.vue'),
        children: [
            {
                path: '/compute/login',
                name: 'Login',
                meta: { title: { cn: '', en: '' }, Authorize: 'AUTH_NONE' },
                component: () => import('@/views/middle/login.vue')
            },
            {
                path: '/compute/register',
                name: 'Register',
                meta: { title: { cn: '', en: '' }, Authorize: 'AUTH_NONE' },
                component: () => import('@/views/middle/register.vue')
            }
        ]
    }
])

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

/**路由守卫**/
export function setupGuardRouter(router: Router) {
    const store = useManager()
    router.beforeEach(async (to, form, next) => {
        const token = await cookie.getStore(cookie.APP_AUTH_TOKEN, { sync: true })
        if (token) {
            const isRefresh = store.router.length === 0
            if (isRefresh) {
                await store.httpRouter().catch(async e => {
                    await cookie.delStore(cookie.APP_AUTH_TOKEN)
                    return next()
                })
            }
        } else {
            switch (to.meta.Authorize) {
                case 'AUTH': //未登录进入AUTH界面、重定向到登录页
                    return next({ path: '/compute/login', replace: true })
                case 'AUTH_NONE':
                case 'NONE': //未登录进入NONE、AUTH_NONE界面、允许进入
                    return next()
                default:
                    return next()
            }
        }
    })

    router.afterEach((to, form) => {
        // window.$loading.finish()
        store.setCurrent(to.path)
    })
}

export function setupRouter(app: App<Element>) {
    app.use(router)
    setupGuardRouter(router)
}

export default router
