import { computed, type App } from 'vue'
import { createI18n, useI18n } from 'vue-i18n'
import { cookie } from '@/utils/utils-cookie'
import { messages, type I18nContext } from './messages'
import { type Path } from './i18n-interface'

export const i18n = createI18n({
    legacy: false,
    locale: cookie.getStore(cookie.APP_AUTH_LOCALE, 'cn'),
    messages
})

export function setupI18n(app: App<Element>) {
    app.use(i18n)
}

export function useCurrent() {
    const context = useI18n()
    const locale = computed(() => i18n.global.locale.value)
    const Locale = computed(() => {
        switch (locale.value) {
            case 'cn':
                return messages.cn
            case 'en':
                return messages.en
            default:
                return messages.cn
        }
    })

    //@ts-ignore、重载t方法
    function t(path: Path<I18nContext>, props: Record<string, unknown> = {}): string {
        return context.t(path, props)
    }

    //@ts-ignore、异步重载t方法
    function at<T = Record<string, unknown>>(path: Path<I18nContext>, props: Record<string, unknown> = {}) {
        return (e: T) => t(path, props)
    }

    //@ts-ignore、载tm方法
    function tm<T = Array<{ label: string; value: unknown }>>(path: Path<I18nContext>): T {
        return context.tm(path)
    }

    //@ts-ignore、异步重载tm方法
    function atm<T = Array<{ label: string; value: unknown }>, R = Record<string, unknown>>(path: Path<I18nContext>): (e: R) => T {
        //@ts-ignore
        return (e: R) => context.tm(path)
    }

    //切换语言
    const setLocale = (value: 'en' | 'cn') => {
        return cookie.setStore(cookie.APP_AUTH_LOCALE, value).then(() => {
            return (i18n.global.locale.value = value)
        })
    }

    return { locale, Locale, t, at, atm, tm, setLocale }
}
