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
}

export function useCompute(props?: ICompute) {
    const { state, setState } = useState<Required<ICompute>>({
        mobile: props?.mobile ?? '',
        password: props?.password ?? '',
        code: props?.code ?? '',
        nickname: props?.nickname ?? '',
        loading: props?.loading ?? false,
        duration: props?.duration ?? 0,
        fetch: props?.fetch ?? false
    })

    const codeURL = ref<string>(`${import.meta.env.VITE_API_BASE}/api/core/fetch-captcha?t=${Date.now()}`)
    const formRef = ref<FormInst>()
    const rules = ref<FormRules>({
        mobile: [
            { key: 'mobile', required: true, message: '请输入手机号', trigger: 'blur' },
            {
                key: 'mobile',
                message: '手机号错误',
                trigger: 'blur',
                validator: (rule, value) => value && /^(?:(?:\+|00)86)?1\d{10}$/.test(value)
            }
        ],
        password: [
            { key: 'password', required: true, message: '请输入密码', trigger: 'blur' },
            { key: 'password', min: 6, max: 18, message: '密码长度必须6~18位', trigger: 'blur' }
        ],
        code: [{ key: 'code', required: true, message: '请输入验证码', trigger: 'blur' }],
        nickname: [{ key: 'nickname', required: true, message: '请输入用户昵称', trigger: 'blur' }]
    })

    const isRule = (rule: FormItemRule, keys: string[]) => {
        return keys.includes(rule?.key ?? '')
    }

    const onRefresh = () => {
        codeURL.value = `${import.meta.env.VITE_API_BASE}/api/core/fetch-captcha?t=${Date.now()}`
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
