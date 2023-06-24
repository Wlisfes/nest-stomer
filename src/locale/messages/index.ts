import { zhCN, dateZhCN, enUS, dateEnUS } from 'naive-ui'
import middle from './middle'
import common from './common'
import route from './route'
import rule from './rule'

export type I18nContext = typeof messages.cn & typeof messages.en
export const messages = {
    cn: {
        ...zhCN,
        ...dateZhCN,
        middle: middle.cn,
        common: common.cn,
        route: route.cn,
        rule: rule.cn
    },
    en: {
        ...enUS,
        ...dateEnUS,
        middle: middle.en,
        common: common.en,
        route: route.en,
        rule: rule.en
    }
}
