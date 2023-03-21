import type { App } from 'vue'
import { createI18n } from 'vue-i18n'

interface Message {
    default: {
        namespace: string
        cn: Record<string, unknown>
        en: Record<string, unknown>
    }
}
const _default_ = { cn: {}, en: {} }

const read = import.meta.glob('./messages/*.ts')
const messages = await Object.keys(read).reduce(async (compose: any, fnName) => {
    const current = await compose
    const { default: n } = (await read[fnName]()) as Message
    if (n.namespace) {
        current.cn[n.namespace] = n.cn
        current.en[n.namespace] = n.cn
    } else {
        current.cn = Object.assign(current.cn, n.cn)
        current.en = Object.assign(current.en, n.en)
    }
    return current
}, _default_)

export const i18n = createI18n({
    legacy: false,
    locale: 'cn',
    messages
})

export function setupI18n(app: App<Element>) {
    app.use(i18n)
}
