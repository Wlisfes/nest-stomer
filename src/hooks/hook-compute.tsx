import { ref, toRefs } from 'vue'
import { FormInst, FormRules, FormItemRule } from 'naive-ui'
import { useState } from '@/hooks/hook-state'
import { useLocale } from '@/hooks/hook-locale'

export interface ICompute {
    mobile?: string
    password?: string
    code?: string
    nickname?: string
    loading?: boolean
    duration?: number
    fetch?: boolean
    checked?: boolean
    base?: string
}

export function useCompute(props?: ICompute) {
    const { state, setState } = useState<Required<ICompute>>({
        mobile: props?.mobile ?? '',
        password: props?.password ?? '',
        code: props?.code ?? '',
        nickname: props?.nickname ?? '',
        loading: props?.loading ?? false,
        duration: props?.duration ?? 0,
        fetch: props?.fetch ?? false,
        checked: props?.checked ?? false,
        base: props?.base ?? import.meta.env.VITE_API_BASE
    })
    const { t } = useLocale()
    const codeURL = ref<string>(`${state.base}/api/core/fetch-captcha?width=120&height=50&fontSize=50&t=${Date.now()}`)
    const formRef = ref<FormInst>()
    const rules = ref<FormRules>({
        mobile: {
            key: 'mobile',
            required: true,
            trigger: 'blur',
            validator: (rule, value) => {
                if (!value) {
                    return new Error(t('compute.mobile.placeholder'))
                } else if (!/^(?:(?:\+|00)86)?1\d{10}$/.test(value)) {
                    return new Error(t('compute.mobile.rule'))
                }
                return true
            }
        },
        password: {
            key: 'password',
            required: true,
            trigger: 'blur',
            validator: (rule, value) => {
                if (!value) {
                    return new Error(t('compute.password.placeholder'))
                } else if (value.length < 6 || value.length > 18) {
                    return new Error(t('compute.password.rule'))
                }
                return true
            }
        },
        code: { key: 'code', required: true, message: t('compute.code.placeholder'), trigger: 'blur' },
        nickname: { key: 'nickname', required: true, message: t('compute.nickname.placeholder'), trigger: 'blur' }
    })

    const isRule = (rule: FormItemRule, keys: string[]) => {
        return keys.includes(rule?.key ?? '')
    }

    const onRefresh = () => {
        codeURL.value = `${state.base}/api/core/fetch-captcha?width=120&height=50&fontSize=50&t=${Date.now()}`
    }

    const setTime = (value: number) => {
        if (state.duration === 0) {
            setState({ duration: value }).then(() => {
                const interval = setInterval(() => {
                    if (state.duration > 0) {
                        state.duration--
                    } else {
                        interval && clearInterval(interval)
                    }
                }, 1000)
            })
        }
    }

    return {
        ...toRefs(state),
        codeURL,
        formRef,
        rules,
        state,
        setState,
        isRule,
        onRefresh,
        setTime
    }
}
