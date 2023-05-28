import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('@/views/Home.vue')
        }
    ]
})

export default router

export function setupRouter(app: App<Element>) {
    app.use(router)
    // setupGuardRouter(router)
}
