import { ref, toRefs } from 'vue'
import { FormInst, FormRules, FormItemRule } from 'naive-ui'
import { useState } from '@/hooks/hook-state'

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

    const codeURL = ref<string>(`${state.base}/api/core/fetch-captcha?width=120&height=50&fontSize=50&t=${Date.now()}`)
    const formRef = ref<FormInst>()
    const rules = ref<FormRules>({
        mobile: {
            key: 'mobile',
            required: true,
            trigger: 'blur',
            validator: (rule, value) => {
                if (!value) {
                    return new Error('请输入手机号')
                } else if (!/^(?:(?:\+|00)86)?1\d{10}$/.test(value)) {
                    return new Error('手机号错误')
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
                    return new Error('请输入密码')
                } else if (value.length < 6 || value.length > 18) {
                    return new Error('密码长度必须6~18位')
                }
                return true
            }
        },
        code: { key: 'code', required: true, message: '请输入验证码', trigger: 'blur' },
        nickname: { key: 'nickname', required: true, message: '请输入用户昵称', trigger: 'blur' }
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
