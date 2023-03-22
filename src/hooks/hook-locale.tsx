import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { i18n, messages, I18nContext, Path } from '@/locale'
import { setCookie, APP_AUTH_LOCALE } from '@/utils/utils-cookie'

export function useLocale() {
    const { t: use } = useI18n()
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

    /**重载t方法**/
    function t(key: Path<I18nContext>, named?: Record<string, unknown>) {
        if (named) {
            return use(key, named)
        }
        return use(key)
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
        setLocale
    }
}
