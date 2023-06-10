import { isEmpty } from 'class-validator'

interface INode<T = unknown> {
    value: T
    expire?: number
}

export class CookieStorage {
    private instance: Storage = window.localStorage
    public APP_AUTH_TOKEN: string = 'APP_AUTH_TOKEN'
    public APP_AUTH_REFRESH: string = 'APP_AUTH_REFRESH'
    public APP_AUTH_EXPIRE: string = 'APP_AUTH_EXPIRE'
    public APP_AUTH_LOCALE: string = 'APP_AUTH_LOCALE'
    public APP_AUTH_RELACE: string = 'APP_AUTH_RELACE'

    /**存入**/
    public async setStore(key: string, value: unknown, expire?: number): Promise<void> {
        const node: INode = {
            value,
            expire: expire ? new Date().getTime() + expire : undefined
        }
        return this.instance.setItem(key, JSON.stringify(node))
    }

    /**读取**/
    public getStore<T>(key: string, option?: { sync?: boolean; value?: T }) {
        const nodeStr = this.instance.getItem(key)
        const node: INode<T> = JSON.parse(nodeStr ?? '{}')
        if (!isEmpty(node.value) && (!node.expire || new Date().getTime() < node.expire)) {
            if (option?.sync) {
                return Promise.resolve(node.value)
            }
            return node.value
        } else {
            if (option?.sync) {
                return this.delStore(key).then(() => option.value)
            }
            this.delStore(key)
            return option?.value
        }
    }

    /**删除**/
    public async delStore(key: string): Promise<void> {
        return this.instance.removeItem(key)
    }

    /**清空**/
    public async allClear(): Promise<void> {
        return this.instance.clear()
    }
}

export const cookie = new CookieStorage()
window.$cookie = cookie
