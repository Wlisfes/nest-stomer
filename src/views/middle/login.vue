<script lang="tsx">
import { defineComponent } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { OnClickOutside } from '@vueuse/components'
import { useCurrent } from '@/locale/instance'
import { useCustomize } from '@/hooks/hook-customize'
import { createRequest } from '@/utils/utils-request'
import { stop, loadFile } from '@/utils/utils-common'
import { httpAuthorize } from '@/api/http-user'

export default defineComponent({
    name: 'Login',
    components: { OnClickOutside },
    setup() {
        const router = useRouter()
        const { t } = useCurrent()
        const { formRef, state, setState, divineFormValidater } = useCustomize({
            loading: false,
            disabled: false,
            visible: false,
            form: {
                mobile: undefined,
                password: undefined
            },
            rules: {
                mobile: [
                    { required: true, trigger: ['blur', 'change'], message: t('middle.mobile.placeholder') },
                    { trigger: ['blur', 'change'], pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: t('middle.mobile.rule') }
                ],
                password: [
                    { required: true, trigger: ['blur', 'change'], message: t('middle.password.placeholder') },
                    { trigger: ['blur', 'change'], min: 6, max: 18, message: t('middle.password.rule') }
                ]
            }
        })

        /**验证表单**/
        async function onSubmit() {
            return divineFormValidater(() => setState({ visible: true, disabled: true })).catch(e => {})
        }

        /**滑动验证成功**/
        async function fetchAuthorize(e: { token: string; session: string }) {
            await setState({ visible: false, disabled: true, loading: true })
            return createRequest({
                execute: async () => {
                    const { data } = await httpAuthorize({
                        mobile: state.form.mobile as never,
                        password: window.btoa(state.form.password as never),
                        session: e.session,
                        token: e.token
                    })
                    await window.$cookie.setStore(window.$cookie.APP_AUTH_TOKEN, data.token, data.expire * 1000)
                    await window.$cookie.setStore(window.$cookie.APP_AUTH_REFRESH, data.refresh, data.expire * 1000 * 10)
                    await window.$cookie.setStore(window.$cookie.APP_AUTH_EXPIRE, Date.now() + data.expire * 0.9 * 1000, data.expire * 1000)
                    return window.$notification.success({
                        title: data.message,
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
                },
                catch: err => {
                    return setState({ loading: false, disabled: false }).finally(() => {
                        window.$notification.error({ title: err.message, duration: 2500 })
                    })
                },
                finally: () => setState({ loading: false, disabled: false })
            })
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
                    <n-form-item>
                        <n-popover trigger="manual" style={{ padding: 0 }} show={state.visible}>
                            {{
                                default: () => (
                                    <onClickOutside onTrigger={(e: PointerEvent) => setState({ visible: false, disabled: false })}>
                                        <common-captcha onSuccess={fetchAuthorize}></common-captcha>
                                    </onClickOutside>
                                ),
                                trigger: () => (
                                    <n-button
                                        class="antd-submit"
                                        type="info"
                                        size="medium"
                                        disabled={state.disabled}
                                        loading={state.loading}
                                        onClick={(e: Event) => stop(e, onSubmit)}
                                    >
                                        {t('middle.login.alias')}
                                    </n-button>
                                )
                            }}
                        </n-popover>
                    </n-form-item>
                    <n-form-item show-feedback={false}>
                        <n-space justify="space-between" style={{ width: '100%' }}>
                            <RouterLink replace to="/middle/register">
                                <n-a href="#">{t('middle.password.alias')}</n-a>
                            </RouterLink>
                            <RouterLink replace to="/middle/register">
                                <n-a href="#">{t('middle.register.alias')}</n-a>
                            </RouterLink>
                        </n-space>
                    </n-form-item>
                    <n-divider>其他登录方式</n-divider>
                    <n-form-item>
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
