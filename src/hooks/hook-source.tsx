import { toRefs, UnwrapNestedRefs } from 'vue'
import { DataTableBaseColumn } from 'naive-ui'
import { NResponse } from '@/axios'
import { useState } from '@/hooks/hook-state'
import { initMounte } from '@/utils/utils-tool'

export interface ISource<T> {
    page: number
    size: number
    total: number
    loading: boolean
    status: number | null | undefined
    dataSource: Array<T>
}
export interface IOption<T, R> {
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

export function useSource<T, R extends Object>(option: IOption<T, R>) {
    const { props = {}, immediate, init } = option
    const { state, setState } = useState<ISource<T> & R>(
        Object.assign({
            ...props,
            page: 1,
            size: 10,
            total: 0,
            loading: true,
            status: null,
            dataSource: [],
            dataColumn: option.dataColumn
        })
    )

    /**初始化列表接口**/
    const fetchColumn = (handler?: Function) => {
        return new Promise(async resolve => {
            try {
                await setState({ loading: true } as never)
                const { data } = await init(state)
                setState({
                    total: data.total,
                    dataSource: data.list || [],
                    loading: false
                } as never).then(() => {
                    handler?.(data)
                    resolve(data)
                })
            } catch (e) {
                setState({ loading: false } as never)
            }
        })
    }

    /**列表更新**/
    const fetchUpdate = (parameter?: Partial<ISource<T> & R>, handler?: Function) => {
        return new Promise(async (resolve, reject) => {
            try {
                await setState(parameter as never)
                const data = await fetchColumn(handler)
                resolve(data)
            } catch (e) {
                reject(e)
            }
        })
    }

    initMounte(() => {
        immediate && fetchColumn()
    })

    return {
        ...toRefs(state),
        state,
        setState,
        fetchColumn,
        fetchUpdate
    }
}
