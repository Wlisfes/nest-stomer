import { defineStore } from 'pinia'

export const useCommon = defineStore({
    id: 'common',
    persist: {
        enabled: true
    },
    state: () => ({
        locale: 'cn'
    }),
    actions: {
        setLocale(locale: 'cn' | 'en') {
            this.locale = locale
        }
    }
})
