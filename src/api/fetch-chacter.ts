import { request } from '@/utils/utils-request'
import { ICommon, RCommon } from '@/interface/fetch-core'

export interface IChacter extends ICommon {
    command: string
    comment: string
    cn: string
    en: string
}

/**创建字典**/
export function createChacter(data: { command: string; comment?: string; cn: string; en: string }) {
    return request({ method: 'POST', url: `/api/chacter/create`, data })
}

/**字典列表**/
export function columnChacter(params: { page: number; size: number; command?: string }) {
    return request<RCommon<IChacter>>({ url: `/api/chacter/column`, method: 'GET', params })
}
