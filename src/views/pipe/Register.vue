<script lang="tsx">
import { defineComponent } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useLocale } from '@/hooks/hook-locale'
import { useRxicon } from '@/hooks/hook-icon'
import { useCompute } from '@/hooks/hook-compute'
import { httpMobile } from '@/api/fetch-core'
import { useEnter } from '@/utils/utils-event'
import { httpRegister } from '@/api/fetch-user'

export default defineComponent({
    name: 'Register',
    setup() {
        const router = useRouter()
        const { t } = useLocale()
        const { compute } = useRxicon()
        const { formRef, rules, state, setState, isRule, setTime } = useCompute()

        /**发送手机验证码**/
        async function fetchMobile() {
            try {
                await formRef.value?.validate(
                    error => error,
                    rule => isRule(rule, ['mobile'])
                )
                await setState({ fetch: true })
                await httpMobile({ mobile: state.mobile })
                await setState({ fetch: false }).then(() => setTime(60))
            } catch (e) {
                setState({ fetch: false })
            }
        }

        /**注册**/
        async function onSubmit() {
            try {
                await formRef.value?.validate()
                await setState({ loading: true })
                await httpRegister({
                    nickname: state.nickname,
                    password: window.btoa(state.password),
                    mobile: state.mobile,
                    code: state.code
                })
                await setState({ loading: false }).then(() => router.replace('/compute/login'))
            } catch (e) {
                setState({ loading: false })
            }
        }

        return () => {
            return (
                <div>
                    <h1>{t('compute.register.value')}</h1>
                    <n-form ref={formRef} model={state} rules={rules.value} label-placement="left">
                        <n-form-item path="nickname">
                            <n-input
                                v-model:value={state.nickname}
                                size="medium"
                                placeholder={t('compute.nickname.value')}
                                input-props={{ autocomplete: 'off' }}
                                onKeydown={(e: KeyboardEvent) => useEnter(e, 'Enter', onSubmit)}
                            >
                                {{ prefix: () => <n-icon size={24} component={compute('UserOutlined')} /> }}
                            </n-input>
                        </n-form-item>
                        <n-form-item path="password">
                            <n-input
                                v-model:value={state.password}
                                size="medium"
                                type="password"
                                placeholder={t('compute.password.value')}
                                show-password-on="mousedown"
                                input-props={{ autocomplete: 'new-password' }}
                                onKeydown={(e: KeyboardEvent) => useEnter(e, 'Enter', onSubmit)}
                            >
                                {{ prefix: () => <n-icon size={24} component={compute('LockOutlined')} /> }}
                            </n-input>
                        </n-form-item>
                        <n-form-item path="mobile">
                            <n-input
                                v-model:value={state.mobile}
                                size="medium"
                                maxlength={11}
                                placeholder={t('compute.mobile.value')}
                                input-props={{ autocomplete: 'off' }}
                                onKeydown={(e: KeyboardEvent) => useEnter(e, 'Enter', onSubmit)}
                            >
                                {{ prefix: () => <n-icon size={24} component={compute('PhoneOutlined')} /> }}
                            </n-input>
                            <n-button
                                size="medium"
                                class="n-customize"
                                ghost
                                style={{ minWidth: '120px', height: '50px', marginLeft: '10px' }}
                                disabled={state.duration > 0}
                                loading={state.fetch}
                                onClick={fetchMobile}
                            >
                                {state.duration > 0 ? (
                                    <n-text>{t('compute.code.reset', { n: state.duration })}</n-text>
                                ) : (
                                    <n-text>{t('compute.code.send')}</n-text>
                                )}
                            </n-button>
                        </n-form-item>
                        <n-form-item path="code">
                            <n-input
                                v-model:value={state.code}
                                size="medium"
                                placeholder={t('compute.code.value')}
                                input-props={{ autocomplete: 'off' }}
                                onKeydown={(e: KeyboardEvent) => useEnter(e, 'Enter', onSubmit)}
                            >
                                {{ prefix: () => <n-icon size={24} component={compute('VerifiedOutlined')} /> }}
                            </n-input>
                        </n-form-item>
                        <n-form-item>
                            <n-button class="antd-submit" type="info" size="medium" round loading={state.loading} onClick={onSubmit}>
                                {t('common.submit.value')}
                            </n-button>
                        </n-form-item>
                        <n-form-item show-feedback={false}>
                            <n-space justify="space-between" style={{ width: '100%' }}>
                                <n-text></n-text>
                                <RouterLink replace to="/compute/login">
                                    {{
                                        default: ({ navigate, href }: { navigate: Function; href: string }) => (
                                            <n-a href={href} onClick={navigate}>
                                                {t('compute.login.alias')}
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
    }
})
</script>
