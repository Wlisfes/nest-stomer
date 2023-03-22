import { defineStore } from 'pinia'

export const useCommon = defineStore({
    id: 'common',
    persist: {
        enabled: true
    },
    state: () => ({}),
    actions: {}
})
