import { createApp, defineComponent, createVNode, nextTick } from 'vue'
import { divineParameter, divineHandler } from '@/utils/utils-common'
import { Observer } from '@/utils/utils-observer'
import { setupI18n } from '@/locale/instance'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'
export type Event = 'close' | 'submit' | 'cancel' | 'confirm' | 'refresh'
export type IOnspector = { done: () => Promise<void> }
export type IObserver = Record<Event, IOnspector>

export async function createComponent<T>(RootComponent: Parameters<typeof createApp>['0'], option?: { immediate?: boolean; props?: T }) {
    const el = document.createElement('div')
    const observer = new Observer<IObserver>()
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
    async function unmount(e: IOnspector) {
        observer.emit('close', e)
        app.unmount()
        return el.remove()
    }

    async function submit(e: IOnspector) {
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
