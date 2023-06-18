import { computed } from 'vue'

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
