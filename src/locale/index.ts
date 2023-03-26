import { type App } from 'vue'
import { zhCN, dateZhCN, enUS, dateEnUS } from 'naive-ui'
import { createI18n } from 'vue-i18n'
import { getCookie, APP_AUTH_LOCALE } from '@/utils/utils-cookie'
import * as lang from './messages'
export * from './locale'

export const messages = {
    cn: {
        ...zhCN,
        ...dateZhCN,
        common: lang.common.cn,
        compute: lang.compute.cn,
        basic: lang.basic.cn
    },
    en: {
        ...enUS,
        ...dateEnUS,
        common: lang.common.en,
        compute: lang.compute.en,
        basic: lang.basic.en
    }
}

export type I18nContext = typeof messages.cn & typeof messages.en
export const i18n = createI18n({
    legacy: false,
    locale: getCookie(APP_AUTH_LOCALE) || 'cn',
    messages
})

export function setupI18n(app: App<Element>) {
    app.use(i18n)
}
