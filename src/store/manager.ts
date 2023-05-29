import type { MenuOption } from 'naive-ui'
import { defineStore } from 'pinia'

export const useManager = defineStore({
    id: 'manager',
    state: () => ({
        device: 'PC',
        width: 0,
        current: '',
        expanded: [],
        collapse: false,
        theme: 'light',
        inverted: 'light',
        primaryColor: '#18a058',
        reload: true,
        breadcr: true,
        better: true,
        router: [],
        menu: []
    })
})
