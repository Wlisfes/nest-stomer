import { computed, ref, type ComputedRef } from 'vue'
import { useThemeVars, darkTheme, lightTheme, type GlobalThemeOverrides, type ThemeCommonVars } from 'naive-ui'
import { useManager } from '@/store/manager'

type CustomizeVars = {
    backColor: string
    backMarkColor: string
    backCodeColor: string
    disableBackColor: string
    disableTextColor: string
    disableBorderColor: string
    enableBackColor: string
    enableTextColor: string
    enableBorderColor: string
}
export type ThemeVars = ComputedRef<ThemeCommonVars & CustomizeVars>

export function useProvider() {
    const store = useManager()
    const vars = useThemeVars() as ThemeVars
    const lightThemeOverrides = computed<GlobalThemeOverrides>(() => ({
        common: {
            backColor: 'rgb(244, 246, 248)',
            primaryColor: store.primaryColor
        }
    }))
    const darkThemeOverrides = computed<GlobalThemeOverrides>(() => ({
        common: {
            backColor: 'rgb(16,16,20)',
            primaryColor: store.primaryColor,
            primaryColorSuppl: store.primaryColor
        }
    }))
    const primaryVars = ref<Array<string>>([
        '#1b73fa',
        '#0960bd',
        '#0084f4',
        '#009688',
        '#536dfe',
        '#ff5c93',
        '#ee4f12',
        '#0096c7',
        '#9c27b0',
        '#ff9800',
        '#FF3D68',
        '#00C1D4',
        '#18a058',
        '#52c41a',
        '#78DEC7',
        '#1768AC',
        '#FB9300',
        '#FC5404'
    ])

    const inverted = computed(() => {
        if (store.theme === 'dark' || store.inverted === 'nav-dark') {
            return { sider: true, header: true }
        } else if (store.inverted === 'dark') {
            return { sider: true, header: false }
        } else {
            return { sider: false, header: false }
        }
    })

    const theme = computed(() => {
        switch (store.theme) {
            case 'light':
                return lightTheme
            case 'dark':
                return darkTheme
            default:
                return lightTheme
        }
    })

    const themeOverrides = computed(() => {
        switch (store.theme) {
            case 'light':
                return lightThemeOverrides.value
            case 'dark':
                return darkThemeOverrides.value
            default:
                return lightThemeOverrides.value
        }
    })

    return { theme, themeOverrides, vars, primaryVars, inverted }
}
