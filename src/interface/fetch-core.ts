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
export interface IColumn<T = Object> {
    page: number
    size: number
    total: number
    loading: boolean
    dataSource: Array<T>
}

export type ICommand = 'edit' | 'reset' | 'disable' | 'enable' | 'delete'
