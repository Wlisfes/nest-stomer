import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { i18n, messages, I18nContext, Path } from '@/locale'
import { setCookie, APP_AUTH_LOCALE } from '@/utils/utils-cookie'

export function useLocale() {
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
    function t(path: Path<I18nContext>, props: Record<string, unknown> = {}) {
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

    const setLocale = (value: 'en' | 'cn') => {
        setCookie(APP_AUTH_LOCALE, value).then(() => {
            i18n.global.locale.value = value
        })
    }

    return {
        locale,
        Locale,
        t,
        at,
        atm,
        tm,
        setLocale
    }
}
