import { zhCN, dateZhCN, enUS, dateEnUS } from 'naive-ui'
import { common } from './common'
import { compute } from './compute'

export const messages = {
    cn: {
        ...zhCN,
        ...dateZhCN,
        ...common.cn
    },
    en: {
        ...enUS,
        ...dateEnUS,
        ...common.en
    }
}

export default messages
