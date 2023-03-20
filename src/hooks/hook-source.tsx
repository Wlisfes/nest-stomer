import { toRefs, type UnwrapNestedRefs } from 'vue'
import { type DataTableBaseColumn } from 'naive-ui'
import { type AxiosResponse } from 'axios'
import { type IColumn, type RCommon } from '@/interface/fetch-core'
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
    init: (e: UnwrapNestedRefs<IState<T> & R>) => Promise<AxiosResponse<RCommon<T>>>
}

export function useSource<T, R extends Object>(option: IOption<T, R>) {
    const { props, immediate, init } = option
    //prettier-ignore
    const { state, setState } = useState<IState<T> & R>(Object.assign({
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
                await setState({ loading: true } as Partial<IState<T> & R>)
                await init(state).then(async ({ data }) => {
                    return await setState({
                        total: data.total,
                        dataSource: data.list,
                        loading: false
                    } as Partial<IState<T> & R>)
                })
                handler?.(state)
                resolve(state)
            } catch (e) {
                console.log(e)
                setState({ loading: false } as Partial<IState<T> & R>).then(() => {
                    reject(e)
                })
            }
        })
    }

    /**列表更新**/
    const fetchUpdate = (parameter: Partial<IState<T> & R> = {}, handler?: Function) => {
        return new Promise(async (resolve, reject) => {
            try {
                await setState(parameter)
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
