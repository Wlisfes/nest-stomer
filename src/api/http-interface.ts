export interface Scheme {
    id: number
    createTime: string
    updateTime: string
    status: 'delete' | 'disable' | 'enable'
}
export interface Notice {
    message: string
}
export interface Result<T = Object> {
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
