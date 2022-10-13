import { reactive, toRefs, nextTick, type UnwrapNestedRefs } from 'vue'

export function useState<T extends Object>(props: T) {
    const state = reactive<T>(Object.assign({ ...props }))

    const setState = (parameter: Partial<T>, handler?: (e: typeof state) => void): Promise<UnwrapNestedRefs<T>> => {
        return new Promise(resolve => {
            for (const key in parameter) {
                state[key as keyof UnwrapNestedRefs<T>] = parameter[key as keyof T] as never
            }
            nextTick(() => {
                handler?.(state)
                resolve(state)
            })
        })
    }

    return {
        ...toRefs(state),
        state,
        setState
    }
}
