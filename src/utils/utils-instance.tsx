import { createApp, defineComponent, createVNode, nextTick } from 'vue'
import { divineParameter, divineHandler } from '@/utils/utils-common'
import { Observer } from '@/utils/utils-observer'
import { setupI18n } from '@/locale/instance'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'

// export

export async function createComponent<T>(RootComponent: Parameters<typeof createApp>['0'], option?: { immediate?: boolean; props?: T }) {
    const el = document.createElement('div')
    const observer = new Observer()
    const props = await divineParameter(option?.props ?? {}).then(data => {
        return {
            ...data,
            observer,
            onClose: unmount,
            onSubmit: submit
        }
    })
    const app = createApp(<common-provider>{createVNode(RootComponent, props)}</common-provider>)

    /**组件挂载**/
    async function mounte() {
        return app.mount(el, true)
    }

    /**组件销毁**/
    async function unmount(e: unknown) {
        observer.emit('close', e)
        app.unmount()
        return el.remove()
    }

    async function submit(e: unknown) {
        observer.emit('submit', e)
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
