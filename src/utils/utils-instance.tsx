import { createApp, createVNode, nextTick, render, type CSSProperties } from 'vue'
import { divineParameter } from '@/utils/utils-common'
import { Observer } from '@/utils/utils-observer'
import { setupI18n } from '@/locale/instance'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'
export type Event = 'close' | 'submit' | 'cancel' | 'confirm' | 'refresh'
export type IOnspector = { done: (e?: Partial<{ loading: false; visible: false }>) => Promise<void> }
export type IObserver = Record<Event, IOnspector>

export async function createComponent<T>(Component: Parameters<typeof createApp>['0'], props: T) {
    const el = document.createElement('div')
    const observer = new Observer<IObserver>()
    const parameter = await divineParameter(props ?? {}).then(data => {
        return {
            ...data,
            observer,
            onClose: unmount,
            onSubmit: submit
        }
    })
    const app = createApp(<common-provider>{createVNode(Component, parameter)}</common-provider>)

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

    /**确定、表单提交**/
    async function submit(e: IOnspector) {
        observer.emit('submit', e)
    }

    setupI18n(app)
    setupStore(app)
    setupRouter(app)

    nextTick(async () => {
        await mounte()
    })

    return { el, app, observer, mounte, unmount }
}

/**DOM生成函数**/
export async function createElement<T extends Record<string, unknown> & { style: CSSProperties }>(
    Component: Parameters<typeof createApp>['0'],
    parameter?: T,
    isSVG?: boolean
) {
    const node = document.createElement('section')
    const component = createVNode(<common-provider>{createVNode(Component, parameter)}</common-provider>)
    await render(component, node, isSVG)
    const element = Array.from(node.children).reduce((str: string, el) => (str += el.outerHTML), '')
    return { node, element, component }
}
