import { createApp, createVNode, type Component } from 'vue'
import { setupI18n } from '@/locale/instance'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'

export function createComponent(RootComponent: Component) {
    const app = createApp(<common-provider>{createVNode(RootComponent)}</common-provider>)

    setupI18n(app)
    setupStore(app)
    setupRouter(app)

    return { app }
}
