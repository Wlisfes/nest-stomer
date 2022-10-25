export interface ICommon {
    id: number
    createTime: string
    updateTime: string
    status: number
}
export interface RCommon<T = Object> {
    page: number
    size: number
    total: number
    list: Array<T>
    message: string
}
