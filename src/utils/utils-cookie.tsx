import { isEmpty } from 'class-validator'

interface INode<T = unknown> {
    value: T
    expire?: number
}

export class CookieStorage {
    private instance: Storage = window.localStorage
    public APP_AUTH_TOKEN: string = 'APP_AUTH_TOKEN' //token
    public APP_AUTH_REFRESH: string = 'APP_AUTH_REFRESH' //刷新token
    public APP_AUTH_EXPIRE: string = 'APP_AUTH_EXPIRE' //token有效时间
    public APP_AUTH_LOCALE: string = 'APP_AUTH_LOCALE' //语言
    public APP_AUTH_RELACE: string = 'APP_AUTH_RELACE' //未登录前的重定向地址

    /**存入**/
    public async setStore(key: string, value: unknown, expire?: number): Promise<void> {
        const node: INode = {
            value,
            expire: expire ? new Date().getTime() + expire : undefined
        }
        return this.instance.setItem(key, JSON.stringify(node))
    }

    /**读取**/
    public getStore<T>(key: string, value?: T) {
        const nodeStr = this.instance.getItem(key)
        const node: INode<T> = JSON.parse(nodeStr ?? '{}')
        if (!isEmpty(node.value) && (!node.expire || new Date().getTime() < node.expire)) {
            return node.value
        }
        return value
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
