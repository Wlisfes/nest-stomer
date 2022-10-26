import { toRefs, UnwrapNestedRefs } from 'vue'
import { DataTableBaseColumn } from 'naive-ui'
import { NResponse } from '@/axios'
import { IColumn } from '@/interface/fetch-core'
import { useState } from '@/hooks/hook-state'
import { initMounte } from '@/utils/utils-tool'

export interface IState<T> extends IColumn<T> {
    status: number | null | undefined
    dataColumn: Array<DataTableBaseColumn>
}
export interface IOption<T, R> {
    dataColumn: Array<DataTableBaseColumn>
    props?: R
    immediate?: boolean
    init: (e: UnwrapNestedRefs<IState<T> & R>) => Promise<
        NResponse<{
            list: Array<T>
            total: number
            page: number
            size: number
        }>
    >
}

export function useSource<T, R extends Object>(option: IOption<T, R>) {
    type State = IState<T> & R
    const { props, immediate, init } = option
    //prettier-ignore
    const { state, setState } = useState<State>(Object.assign({
        ...props,
        page: 1,
        size: 10,
        total: 0,
        loading: true,
        dataSource: [],
        dataColumn: option.dataColumn
    }))

    /**初始化列表接口**/
    const fetchColumn = (handler?: Function) => {
        return new Promise(async (resolve, reject) => {
            try {
                await setState({ loading: true } as State)
                await init(state).then(async ({ data }) => {
                    return await setState({ total: data.total, dataSource: data.list, loading: false } as State)
                })
                handler?.(state)
                resolve(state)
            } catch (e) {
                setState({ loading: false } as State).then(() => {
                    reject(e)
                })
            }
        })
    }

    /**列表更新**/
    const fetchUpdate = (parameter: Partial<State> = {}, handler?: Function) => {
        return new Promise(async (resolve, reject) => {
            try {
                await setState(parameter as State)
                await fetchColumn(handler)
                resolve(state)
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
