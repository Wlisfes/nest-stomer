import { h, ref, computed, CSSProperties, VNode, type UnwrapNestedRefs } from 'vue'
import { type DataTableBaseColumn } from 'naive-ui'
import { type NResponse } from '@/axios'

interface ISource<T> {
    page: number
    size: number
    total: number
    loading: boolean
    status: number | null | undefined
    dataSource: Array<T>
}
interface IOption<T, R> {
    dataColumn: Array<DataTableBaseColumn>
    props?: R
    immediate?: boolean
    init: (e: UnwrapNestedRefs<ISource<T> & R>) => Promise<
        NResponse<{
            list: Array<T>
            total: number
            page: number
            size: number
        }>
    >
}

export function useColumn<T, R extends Object>(option: IOption<T, R>) {
    const dataColumn = ref(option.dataColumn)

    return {
        dataColumn
    }
}
