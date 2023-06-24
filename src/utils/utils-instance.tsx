import { createApp, createVNode, nextTick } from 'vue'
import { divineParameter, divineHandler } from '@/utils/utils-common'
import { Observer } from '@/utils/utils-observer'
import { setupI18n } from '@/locale/instance'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'

export async function createComponent<T>(RootComponent: Parameters<typeof createApp>['0'], option?: { immediate?: boolean; props?: T }) {
    const el = document.createElement('div')
    const observer = new Observer<Record<string, unknown>>()
    const props = await divineParameter(option?.props ?? {}).then(data => {
        return { ...data, observer, onUnmount: unmount }
    })
    const app = createApp(<common-provider>{createVNode(RootComponent, props)}</common-provider>)

    async function mounte() {
        return app.mount(el, true)
    }

    async function unmount() {
        app.unmount()
        return el.remove()
    }

    setupI18n(app)
    setupStore(app)
    setupRouter(app)

    nextTick(async () => {
        await divineHandler(
            () => (option && option.immediate) ?? false,
            () => mounte()
        )
    })

    return { el, app, observer, mounte, unmount }
}
