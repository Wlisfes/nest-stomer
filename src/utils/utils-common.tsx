import { computed } from 'vue'

/**文件导入函数**/
export function loadFile(path: string) {
    return new URL(`../assets/${path}`, import.meta.url).href
}
