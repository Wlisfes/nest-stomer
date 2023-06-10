<script lang="tsx">
import { defineComponent } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useCustomizeForm } from '@/hooks/hook-form'
import { useLocale } from '@/locale/instance'
import { loadFile } from '@/utils/utils-common'
import { httpLogin } from '@/api/http-user'
import { baseURL } from '@/utils/utils-request'
interface FormState {
    loading: boolean
    random: number
    form: {
        mobile: string | undefined
        password: string | undefined
        code: string | undefined
    }
}

export default defineComponent({
    name: 'Login',
    setup() {
        const router = useRouter()
        const { t } = useLocale()
        const { formRef, state, setState, divineFormValidater } = useCustomizeForm<FormState>({
            loading: false,
            random: Math.random(),
            form: {
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
                code: { trigger: 'blur', required: true, message: t('middle.code.placeholder') }
            }
        })

        /**登录**/
        function onSubmit() {
            divineFormValidater(() => {
                setState({ loading: true }).finally(async () => {
                    try {
                        const { message, data } = await httpLogin({
                            mobile: state.form.mobile,
                            password: window.btoa(state.form.password as string),
                            code: state.form.code
                        })
                        await window.$cookie.setStore(window.$cookie.APP_AUTH_TOKEN, data.token, data.expire * 1000)
                        await window.$cookie.setStore(window.$cookie.APP_AUTH_REFRESH, data.refresh, data.expire * 1000 * 10)
                        await window.$cookie.setStore(
                            window.$cookie.APP_AUTH_EXPIRE,
                            Date.now() + data.expire * 0.9 * 1000,
                            data.expire * 1000
                        )
                        window.$notification.success({
                            title: message,
                            duration: 2500,
                            onAfterEnter: () => {
                                setState({ loading: false }).finally(() => {
                                    const path = window.$cookie.getStore(window.$cookie.APP_AUTH_RELACE, { value: '/' })
                                    window.$cookie.delStore(window.$cookie.APP_AUTH_RELACE).finally(() => {
                                        router.replace(path as string)
                                    })
                                })
                            }
                        })
                    } catch (e) {
                        setState({ loading: false })
                    }
                })
            }).catch(e => {})
        }

        return () => (
            <div>
                <h1>{t('middle.login.value')}</h1>
                <n-form ref={formRef} model={state.form} rules={state.rules} label-placement="left">
                    <n-form-item path="mobile">
                        <n-input
                            v-model:value={state.form.mobile}
                            maxlength={11}
                            type="text"
                            size="medium"
                            input-props={{ autocomplete: 'off' }}
                            placeholder={t('middle.mobile.placeholder')}
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
                    <n-form-item path="code">
                        <n-input
                            v-model:value={state.form.code}
                            size="medium"
                            maxlength={4}
                            input-props={{ autocomplete: 'off' }}
                            placeholder={t('middle.code.placeholder')}
                        ></n-input>
                        <common-scale max-width={120} scale={120 / 50} style={{ marginLeft: '10px', cursor: 'pointer' }}>
                            <n-image
                                src={`${baseURL}/api/core/fetch-captcha?width=120&height=50&fontSize=50&t=${state.random}`}
                                preview-disabled
                                style={{ borderRadius: '2px' }}
                                onClick={(e: Event) => setState({ random: Math.random() })}
                            >
                                {{
                                    placeholder: () => (
                                        <n-skeleton
                                            width="100%"
                                            height="100%"
                                            style={{ borderRadius: '4px', backgroundColor: '#E8F0FE' }}
                                        />
                                    )
                                }}
                            </n-image>
                        </common-scale>
                    </n-form-item>
                    <n-form-item>
                        <n-button
                            class="antd-submit"
                            type="info"
                            size="medium"
                            disabled={state.loading}
                            loading={state.loading}
                            onClick={onSubmit}
                        >
                            {t('middle.login.alias')}
                        </n-button>
                    </n-form-item>
                    <n-form-item>
                        <n-space justify="space-between" style={{ width: '100%' }}>
                            <RouterLink replace to="/middle/register">
                                <n-a href="#">{t('middle.password.alias')}</n-a>
                            </RouterLink>
                            <RouterLink replace to="/middle/register">
                                <n-a href="#">{t('middle.register.alias')}</n-a>
                            </RouterLink>
                        </n-space>
                    </n-form-item>
                    <n-form-item show-feedback={false}>
                        <n-space justify="center" align="center" size={25} style={{ width: '100%', height: '50px' }}>
                            <n-image width="44" src={loadFile('basic/github-stomer.png')} preview-disabled />
                            <n-image width="44" src={loadFile('basic/wechat-stomer.png')} preview-disabled />
                        </n-space>
                    </n-form-item>
                </n-form>
            </div>
        )
    }
})
</script>
