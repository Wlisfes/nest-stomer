import type { App } from 'vue'
import type { RouteRecordRaw, Router } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { client } from '@/router/client'
import { manager } from '@/router/manager'
import { useManager } from '@/store/manager'
import { useUser } from '@/store/user'
export const routes: Array<RouteRecordRaw> = client.concat([
    ...manager,
    {
        path: '/middle',
        redirect: '/middle/login',
        name: 'Compute',
        meta: { Authorize: 'AUTH_NONE' },
        component: () => import('@/views/middle/compute.vue'),
        children: [
            {
                path: '/middle/login',
                name: 'Login',
                meta: { title: { cn: '', en: '' }, Authorize: 'AUTH_NONE' },
                component: () => import('@/views/middle/login.vue')
            },
            {
                path: '/middle/register',
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
    const user = useUser()
    router.beforeEach(async (to, form, next) => {
        window.$loading.start()
        const token = await window.$cookie.getStore(window.$cookie.APP_AUTH_TOKEN, { sync: true })
        if (token) {
            if (store.router.length === 0) {
                try {
                    await user.httpUser()
                    await store.httpRouter()
                } catch (e) {
                    await window.$cookie.delStore(window.$cookie.APP_AUTH_TOKEN)
                    await window.$cookie.delStore(window.$cookie.APP_AUTH_REFRESH)
                    await window.$cookie.delStore(window.$cookie.APP_AUTH_EXPIRE)
                    return next({ path: '/middle/login', replace: true })
                }
            }
            switch (to.meta.Authorize) {
                case 'AUTH_NONE': //已登录进入AUTH_NONE界面、不允许进入
                    return next({ path: '/', replace: true })
                case 'NONE':
                case 'AUTH': //已登录进入NONE、AUTH界面、允许进入
                    return next()
                default:
                    return next()
            }
        } else {
            switch (to.meta.Authorize) {
                case 'AUTH': //未登录进入AUTH界面、重定向到登录页
                    return next({ path: '/middle/login', replace: true })
                case 'AUTH_NONE':
                case 'NONE': //未登录进入NONE、AUTH_NONE界面、允许进入
                    return next()
                default:
                    return next()
            }
        }
    })

    router.afterEach((to, form) => {
        window.$loading.finish()
        store.setCurrent(to.path)
    })
}

export function setupRouter(app: App<Element>) {
    app.use(router)
    setupGuardRouter(router)
}

export default router
