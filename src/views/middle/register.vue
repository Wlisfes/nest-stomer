<script lang="tsx">
import type { FormInst, FormRules, FormItemRule } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useState } from '@/hooks/hook-state'
import { useCurrent } from '@/locale/instance'
import { loadFile } from '@/utils/utils-common'
interface FormState {
    loading: boolean
    duration: number
    rules: FormRules
    form: {
        nickname: string | undefined | null
        mobile: string | undefined | null
        password: string | undefined | null
        code: string | undefined | null
    }
}

export default defineComponent({
    name: 'Register',
    setup() {
        const formRef = ref<FormInst>()
        const { t } = useCurrent()
        const { state, setState } = useState<FormState>({
            loading: false,
            duration: 0,
            form: {
                nickname: undefined,
                mobile: undefined,
                password: undefined,
                code: undefined
            },
            rules: {
                mobile: [
                    { required: true, trigger: ['blur', 'change'], message: t('middle.mobile.placeholder') },
                    { trigger: ['blur', 'change'], pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: t('middle.mobile.rule') }
                ],
                password: [
                    { required: true, trigger: ['blur', 'change'], message: t('middle.password.placeholder') },
                    { trigger: ['blur', 'change'], min: 6, max: 18, message: t('middle.mobile.rule') }
                ],
                code: { trigger: 'blur', required: true, message: t('middle.code.placeholder') },
                nickname: { required: true, message: t('middle.nickname.placeholder'), trigger: 'blur' }
            }
        })

        async function onSubmit() {
            try {
                await formRef.value?.validate()
            } catch (e) {}
        }

        return () => (
            <div>
                <h1>{t('middle.register.value')}</h1>
                <n-form ref={formRef} model={state.form} rules={state.rules} label-placement="left">
                    <n-form-item path="nickname">
                        <n-input
                            v-model:value={state.form.nickname}
                            size="medium"
                            input-props={{ autocomplete: 'off' }}
                            placeholder={t('middle.nickname.placeholder')}
                        ></n-input>
                    </n-form-item>
                    <n-form-item path="password">
                        <n-input
                            v-model:value={state.form.password}
                            maxlength={16}
                            size="medium"
                            type="password"
                            show-password-on="mousedown"
                            input-props={{ autocomplete: 'new-password' }}
                            placeholder={t('middle.password.placeholder')}
                        ></n-input>
                    </n-form-item>
                    <n-form-item path="mobile">
                        <n-input
                            v-model:value={state.form.mobile}
                            maxlength={11}
                            type="text"
                            size="medium"
                            input-props={{ autocomplete: 'off' }}
                            placeholder={t('middle.mobile.placeholder')}
                        ></n-input>
                        <n-button
                            size="medium"
                            class="n-customize"
                            ghost
                            style={{ minWidth: '120px', height: '50px', marginLeft: '10px' }}
                            disabled={state.duration > 0}
                        >
                            {state.duration > 0 ? (
                                <n-text>{t('middle.code.reset', { n: state.duration })}</n-text>
                            ) : (
                                <n-text>{t('middle.code.send')}</n-text>
                            )}
                        </n-button>
                    </n-form-item>

                    <n-form-item path="code">
                        <n-input
                            v-model:value={state.form.code}
                            size="medium"
                            maxlength={4}
                            input-props={{ autocomplete: 'off' }}
                            placeholder={t('middle.code.placeholder')}
                        ></n-input>
                    </n-form-item>
                    <n-form-item>
                        <n-button class="antd-submit" type="info" size="medium" loading={state.loading} onClick={onSubmit}>
                            {t('middle.register.alias')}
                        </n-button>
                    </n-form-item>
                    <n-form-item show-feedback={false}>
                        <n-space justify="space-between" style={{ width: '100%' }}>
                            <RouterLink replace to="/middle/register">
                                <n-a href="#">{t('middle.password.alias')}</n-a>
                            </RouterLink>
                            <RouterLink replace to="/middle/login">
                                {{
                                    default: ({ navigate, href }: { navigate: Function; href: string }) => (
                                        <n-a href={href} onClick={navigate}>
                                            {t('middle.login.alias')}
                                        </n-a>
                                    )
                                }}
                            </RouterLink>
                        </n-space>
                    </n-form-item>
                </n-form>
            </div>
        )
    }
})
</script>
