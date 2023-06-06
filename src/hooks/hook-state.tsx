import { reactive, toRefs, nextTick, type UnwrapNestedRefs } from 'vue'

export function useState<T extends Object>(props: T) {
    const state = reactive<T>(Object.assign({ ...props }))

    function setState(
        parameter: Partial<T> | ((e: UnwrapNestedRefs<T>) => Partial<T>),
        handler?: (e: typeof state) => void
    ): Promise<UnwrapNestedRefs<T>> {
        return new Promise(resolve => {
            if (typeof parameter === 'function') {
                Object.assign(state, parameter(state))
            } else if (typeof parameter === 'object') {
                Object.assign(state, parameter)
            }
            nextTick(() => {
                handler?.(state)
                resolve(state)
            })
        })
    }

    // const setState = (
    //     parameter: Partial<T> | ((e: UnwrapNestedRefs<T>) => Partial<T>),
    //     handler?: (e: typeof state) => void
    // ): Promise<UnwrapNestedRefs<T>> => {
    //     return new Promise(resolve => {
    //         if (typeof parameter === 'function') {
    //             Object.assign(state, parameter(state))
    //         } else if (typeof parameter === 'object') {
    //             Object.assign(state, parameter)
    //         }
    //         nextTick(() => {
    //             handler?.(state)
    //             resolve(state)
    //         })
    //     })
    // }

    return { ...toRefs(state), state, setState }
}
