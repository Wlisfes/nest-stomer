import { zhCN, dateZhCN, enUS, dateEnUS } from 'naive-ui'
import middle from './middle'
import common from './common'

export type I18nContext = typeof messages.cn & typeof messages.en
export const messages = {
    cn: {
        ...zhCN,
        ...dateZhCN,
        middle: middle.cn,
        common: common.cn
    },
    en: {
        ...enUS,
        ...dateEnUS,
        middle: middle.en,
        common: common.en
    }
}
