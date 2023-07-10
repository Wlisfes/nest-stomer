import { toRefs, onMounted, nextTick, type UnwrapNestedRefs } from 'vue'
import { type DataTableBaseColumn } from 'naive-ui'
import { type IColumn, type Result } from '@/interface/http-interface'
import { type Response } from '@/utils/utils-request'
import { useState } from '@/hooks/hook-state'

export interface IState<T> extends IColumn<T> {
    status: string | null | undefined
    dataColumn: Array<DataTableBaseColumn>
}
export interface IOption<T, R> {
    dataColumn: Array<DataTableBaseColumn>
    props?: R
    immediate?: boolean
    request: (e: UnwrapNestedRefs<IState<T> & R>) => Promise<Response<Result<T>>>
}

export function useSource<T, R extends Object>(option: IOption<T, R>) {
    const { props, request } = option
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

    onMounted(() => {
        if (option.immediate) {
            fetchColumn()
        }
    })

    /**初始化列表接口**/
    function fetchColumn(handler?: Function): Promise<typeof state> {
        return new Promise(resolve => {
            return setState({ loading: true } as Partial<IState<T> & R>).then(async () => {
                try {
                    const { data } = await request(state)
                    await setState({
                        dataSource: data.list,
                        total: data.total
                    } as Partial<IState<T> & R>)
                } catch (e) {
                } finally {
                    nextTick(async () => {
                        await setState({ loading: false } as Partial<IState<T> & R>)
                        handler?.(state)
                        resolve(state)
                    })
                }
            })
        })
    }

    /**列表更新**/
    function fetchUpdate(parameter: Partial<IState<T> & R> = {}, handler?: Function): Promise<typeof state> {
        return setState(parameter).then(async () => {
            return await fetchColumn(handler)
        })
    }

    return {
        ...toRefs(state),
        state,
        setState,
        fetchColumn,
        fetchUpdate
    }
}
