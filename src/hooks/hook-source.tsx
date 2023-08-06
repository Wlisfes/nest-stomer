import { toRefs, onMounted, nextTick } from 'vue'
import { type Result } from '@/interface/http-interface'
import { type Response } from '@/utils/utils-request'
import { divineHandler } from '@/utils/utils-common'
import { useState } from '@/hooks/hook-state'
type Option<T extends Record<string, any>, R extends Record<string, any>> = {
    page?: number
    size?: number
    total?: number
    loading?: boolean
    form: R
    immediate?: boolean
    dataSource?: Array<T>
}

export function useSource<T extends Object, R extends Object>(
    option: Option<T, R>,
    request: (e: Required<Option<T, R>>) => Promise<Response<Result<T>>>
) {
    const { state, setState } = useState<Required<typeof option>>({
        immediate: option.immediate ?? false,
        form: option.form,
        page: option.page ?? 1,
        size: option.size ?? 10,
        total: option.total ?? 0,
        loading: option.loading ?? true,
        dataSource: option.dataSource ?? []
    })

    onMounted(async () => {
        await divineHandler(state.immediate, () => {
            fetchColumn()
        })
    })

    /**初始化列表接口**/
    function fetchColumn(handler?: Function): Promise<typeof state> {
        return new Promise(resolve => {
            return setState({ loading: true } as Partial<typeof option>).then(async () => {
                try {
                    const { data } = await request(state as Required<typeof option>)
                    await setState({
                        dataSource: data.list,
                        total: data.total
                    } as typeof option)
                } catch (e) {
                } finally {
                    nextTick(async () => {
                        await setState({ loading: false } as typeof option)
                        handler?.(state)
                        resolve(state)
                    })
                }
            })
        })
    }

    /**列表更新**/
    function fetchUpdate(parameter: Partial<typeof option> = {}, handler?: Function): Promise<typeof state> {
        return setState(parameter).then(async () => {
            return await fetchColumn(handler)
        })
    }

    return {
        state,
        ...toRefs(state),
        setState,
        fetchColumn,
        fetchUpdate
    }
}
