import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import * as lang from './messages'

export const messages = lang.messages
export const i18n = createI18n({
    legacy: false,
    locale: 'cn',
    messages
})

export function setupI18n(app: App<Element>) {
    app.use(i18n)
}
