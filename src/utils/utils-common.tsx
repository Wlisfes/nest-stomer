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

/**指令筛选**/
export function divineAndSelecter(dataCommand: Array<{ key: string; visible: boolean }> = []) {
    return dataCommand.filter(x => x.visible).map(x => x.key)
}

/**响应式断点计算**/ //prettier-ignore
export function divineCols(data: Record<number, number> = {}, width: number, defaultCols: number) {
    const cols = Object.keys(data).map(Number).sort((a, b) => a - b).find(value => width < value)
    return cols && data ? data[cols] : defaultCols
}

/**响应式节点计算**/
export function divineColsNode(data: Record<number, number> = {}, cols: number, defaultCols: number) {
    return data[cols] ?? defaultCols
}
