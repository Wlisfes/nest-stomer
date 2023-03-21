import { type App } from 'vue'
import { zhCN, dateZhCN, enUS, dateEnUS } from 'naive-ui'
import { createI18n } from 'vue-i18n'
import * as locale from './messages'

export const messages = {
    cn: {
        ...zhCN,
        ...dateZhCN,
        common: locale.common.cn,
        compute: locale.compute.cn
    },
    en: {
        ...enUS,
        ...dateEnUS,
        common: locale.common.en,
        compute: locale.compute.en
    }
}

export type I18nMessages = typeof messages
export type Path<Obj> = {
    [Key in keyof Obj]: Key extends string
        ? Obj[Key] extends Record<string, any>
            ? Key | `${Key}.${Path<Obj[Key]>}`
            : Key
        : never
}[keyof Obj]

export const i18n = createI18n({
    legacy: false,
    locale: 'cn',
    messages
})

export function setupI18n(app: App<Element>) {
    app.use(i18n)
}
