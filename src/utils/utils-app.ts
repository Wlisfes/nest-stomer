import { createApp, createVNode, nextTick, type Component } from 'vue'
import { UProvider } from '@/components/global'
import { setupStore } from '@/store'
import { setupI18n } from '@/locale'
import { setupRouter } from '@/router'

export function createComponent<RootComponent extends Component, Parameter extends Record<string, unknown>>(
    rootComponent: RootComponent,
    parameter?: Parameter
) {
    const el = document.createElement('div')
    const app = createApp(
        createVNode(UProvider, parameter, {
            default: () => createVNode(rootComponent, parameter)
        })
    )

    const mounte = (to?: HTMLElement, handler?: Function): Promise<void> => {
        return new Promise((resolve, reject) => {
            try {
                app.mount(el, true)
                if (to) {
                    to.appendChild(el)
                } else {
                    document.body.appendChild(el)
                }
                handler?.()
                resolve()
            } catch (e: unknown) {
                reject(e)
            }
        })
    }

    const unmount = (handler?: Function): Promise<void> => {
        return new Promise((resolve, reject) => {
            try {
                app.unmount()
                el.remove()
                nextTick(() => {
                    handler?.()
                    resolve()
                })
            } catch (e: unknown) {
                reject(e)
            }
        })
    }

    setupStore(app)
    setupI18n(app)
    setupRouter(app)

    return { app, el, mounte, unmount }
}
