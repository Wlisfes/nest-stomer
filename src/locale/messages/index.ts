import { zhCN, dateZhCN, enUS, dateEnUS } from 'naive-ui'

export type I18nContext = typeof messages.cn & typeof messages.en
export const messages = {
    cn: {
        ...zhCN,
        ...dateZhCN
    },
    en: {
        ...enUS,
        ...dateEnUS
    }
}
