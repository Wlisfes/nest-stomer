import { createApp, createVNode, nextTick } from 'vue'
import { divineParameter, divineHandler } from '@/utils/utils-common'
import { Observer } from '@/utils/utils-observer'
import { setupI18n } from '@/locale/instance'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'

export async function createComponent<T>(RootComponent: Parameters<typeof createApp>['0'], option?: { immediate?: boolean; props?: T }) {
    const el = document.createElement('div')
    const observer = new Observer()
    const props = await divineParameter(option?.props ?? {}).then(data => {
        return {
            ...data,
            observer,
            onUnmount: unmount,
            onCancel: cancel,
            onConfirm: confirm
        }
    })
    const app = createApp(<common-provider>{createVNode(RootComponent, props)}</common-provider>)

    /**组件挂载**/
    async function mounte() {
        return app.mount(el, true)
    }

    /**组件销毁**/
    async function unmount(e: unknown) {
        observer.emit('unmount', e)
        app.unmount()
        return el.remove()
    }

    async function cancel(e: unknown) {
        observer.emit('cancel', e)
    }

    async function confirm(e: unknown) {
        observer.emit('confirm', e)
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
