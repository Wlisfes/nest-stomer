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

/**链式调用函数**/
export async function divineChained<T>(...args: Function[]): Promise<T> {
    try {
        const handler = args.shift()
        const value = await handler?.()
        if (value instanceof Error) {
            throw new Error(value.message)
        } else if (value && args.length > 0) {
            return await divineChained(...args)
        }
        return value
    } catch (e) {
        throw new Error(e.message)
    }
}
