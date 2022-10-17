import Cookie from 'js-cookie'

/**登录临时会话**/
export const APP_AUTH_SESSION = 'APP-AUTH-SESSION'

export function getSession(defaultValue?: any) {
    return Cookie.get(APP_AUTH_SESSION) ?? defaultValue ?? undefined
}

export async function setSession(session: string, expires: number) {
    return Cookie.set(APP_AUTH_SESSION, session, {
        expires: new Date(new Date().getTime() + expires * 1000)
    })
}

export async function delSession() {
    return Cookie.remove(APP_AUTH_SESSION)
}

/**
 * 读取cookie
 * @param key string
 * @returns any
 */
export function getCookie(key: string, defaultValue?: any) {
    const data = Cookie.get(key)
    return data ? JSON.parse(data) : defaultValue ?? undefined
}

/**
 *写入cookie
 * @param key string
 * @param data any
 * @param expires number | undefined
 * @returns any
 */
export function setCookie(key: string, data: any, expires?: number) {
    if (!expires) {
        return Cookie.set(key, JSON.stringify(data))
    }
    return Cookie.set(key, JSON.stringify(data), {
        expires: new Date(new Date().getTime() + expires)
    })
}

/**
 *清除cookie
 * @param key string
 * @returns void
 */
export function delCookie(key: string) {
    return Cookie.remove(key)
}
