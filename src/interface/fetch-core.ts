export interface ICommon {
    id: number
    createTime: string
    updateTime: string
    status: string
}
export interface RCommon<T = Object> {
    page: number
    size: number
    total: number
    list: Array<T>
    message: string
}
export interface IColumn<T = Object> {
    page: number
    size: number
    total: number
    loading: boolean
    dataSource: Array<T>
}
