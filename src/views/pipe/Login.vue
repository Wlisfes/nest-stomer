<script lang="tsx">
import { defineComponent } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useRxicon } from '@/hooks/hook-icon'
import { useCompute } from '@/hooks/hook-compute'
import { useEnter } from '@/utils/utils-event'
import { httpLogin } from '@/api/fetch-user'
import { loadFile } from '@/utils/utils-tool'
import { setSession } from '@/utils/utils-cookie'

export default defineComponent({
    name: 'Login',
    setup() {
        const router = useRouter()
        const { compute } = useRxicon()
        const { codeURL, formRef, rules, state, setState, onRefresh } = useCompute()

        /**登录**/
        async function onSubmit() {
            try {
                await formRef.value?.validate()
                await setState({ loading: true })
                const { data } = await httpLogin({
                    mobile: state.mobile,
                    password: window.btoa(state.password),
                    code: state.code
                })
                setState({ loading: false }).then(() => {
                    setSession(data.session, data.seconds).then(() => {
                        router.replace('/manager/master')
                    })
                })
            } catch (e) {
                setState({ loading: false }).finally(() => onRefresh())
            }
        }

        return () => {
            return (
                <div>
                    <h1>登 录</h1>
                    <n-form ref={formRef} model={state} rules={rules.value} label-placement="left">
                        <n-form-item path="mobile">
                            <n-input
                                v-model:value={state.mobile}
                                maxlength={11}
                                type="text"
                                size="medium"
                                placeholder="手机号"
                                input-props={{ autocomplete: 'off' }}
                                onKeydown={(e: KeyboardEvent) => useEnter(e, 'Enter', onSubmit)}
                            >
                                {{ prefix: () => <n-icon size={24} component={compute('UserOutlined')} /> }}
                            </n-input>
                        </n-form-item>
                        <n-form-item path="password">
                            <n-input
                                v-model:value={state.password}
                                maxlength={16}
                                size="medium"
                                type="password"
                                show-password-on="mousedown"
                                input-props={{ autocomplete: 'new-password' }}
                                placeholder="密码"
                                onKeydown={(e: KeyboardEvent) => useEnter(e, 'Enter', onSubmit)}
                            >
                                {{ prefix: () => <n-icon size={24} component={compute('LockOutlined')} /> }}
                            </n-input>
                        </n-form-item>
                        <n-form-item path="code">
                            <n-input
                                v-model:value={state.code}
                                size="medium"
                                maxlength={4}
                                placeholder="图形验证码"
                                input-props={{ autocomplete: 'off' }}
                                onKeydown={(e: KeyboardEvent) => useEnter(e, 'Enter', onSubmit)}
                            >
                                {{ prefix: () => <n-icon size={24} component={compute('VerifiedOutlined')} /> }}
                            </n-input>
                            <u-scale max-width={120} scale={120 / 50} style={{ marginLeft: '10px', cursor: 'pointer' }}>
                                <n-image
                                    preview-disabled
                                    src={codeURL.value}
                                    onClick={onRefresh}
                                    style={{ borderRadius: '4px' }}
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
                            </u-scale>
                        </n-form-item>
                        <n-form-item>
                            <n-button
                                class="antd-submit"
                                type="info"
                                size="medium"
                                loading={state.loading}
                                onClick={onSubmit}
                            >
                                提 交
                            </n-button>
                        </n-form-item>
                        <n-form-item>
                            <n-space justify="space-between" style={{ width: '100%' }}>
                                <RouterLink replace to="/compute/register">
                                    <n-a href="#">忘记密码</n-a>
                                </RouterLink>
                                <RouterLink replace to="/compute/register">
                                    <n-a href="#">立即注册</n-a>
                                </RouterLink>
                            </n-space>
                        </n-form-item>
                        <n-form-item show-feedback={false}>
                            <n-space
                                justify="center"
                                align="center"
                                size={25}
                                style={{ width: '100%', height: '50px' }}
                            >
                                <n-image width="44" src={loadFile('resource/github-stomer.png')} preview-disabled />
                                <n-image width="44" src={loadFile('resource/wechat-stomer.png')} preview-disabled />
                                <n-image width="44" src={loadFile('resource/google-stomer.png')} preview-disabled />
                                <n-image width="44" src={loadFile('resource/youtube-stomer.png')} preview-disabled />
                            </n-space>
                        </n-form-item>
                    </n-form>
                </div>
            )
        }
    }
})
</script>
