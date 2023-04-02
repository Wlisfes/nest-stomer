import { type App } from 'vue'
import { zhCN, dateZhCN, enUS, dateEnUS } from 'naive-ui'
import { createI18n } from 'vue-i18n'
import { getCookie, APP_AUTH_LOCALE } from '@/utils/utils-cookie'
import * as locale from './messages'
export * from './locale'

export const messages = {
    cn: {
        ...zhCN,
        ...dateZhCN,
        common: locale.common.cn,
        compute: locale.compute.cn,
        basic: locale.basic.cn,
        route: locale.route.cn
    },
    en: {
        ...enUS,
        ...dateEnUS,
        common: locale.common.en,
        compute: locale.compute.en,
        basic: locale.basic.en,
        route: locale.route.en
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
