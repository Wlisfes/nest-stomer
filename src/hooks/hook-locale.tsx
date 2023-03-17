import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { i18n, messages } from '@/locale'

export function useLocale() {
    const { t } = useI18n()
    const locale = computed(() => i18n.global.locale.value)
    const Locale = computed(() => {
        switch (i18n.global.locale.value) {
            case 'cn':
                return messages.cn
            case 'en':
                return messages.en
            default:
                return messages.cn
        }
    })

    return { t, locale, Locale }
}
