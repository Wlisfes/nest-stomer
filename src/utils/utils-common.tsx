export function prevent(e: Event, handler?: Function) {
    e.preventDefault()
    return handler?.()
}

export function stop(e: Event, handler?: Function) {
    e.preventDefault()
    e.stopPropagation()
    return handler?.()
}

/**文件导入函数**/
export function loadFile(path: string) {
    return new URL(`../assets/${path}`, import.meta.url).href
}

/**延时方法**/
export function divineDelay(delay = 100, handler?: Function) {
    return new Promise(resolve => {
        const timeout = setTimeout(() => {
            handler?.()
            resolve(undefined)
            clearTimeout(timeout)
        }, delay)
    })
}

/**条件函数执行**/
export async function divineHandler<T>(value: boolean | Function, handler: Function): Promise<T | void> {
    const isSupported = typeof value === 'function'
    if ((isSupported && (await value())) || (!isSupported && value)) {
        return await handler()
    }
    return undefined
}

/**参数组合函数**/
export async function divineParameter<T>(data: T) {
    return Object.assign(data as Object)
}

/**批量执行异步函数**/
export function divineAsyncBatch(dataColumn: Array<Function> = []) {
    return Promise.all(dataColumn.map(handler => handler()))
}
