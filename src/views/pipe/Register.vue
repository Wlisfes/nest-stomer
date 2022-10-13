<script lang="tsx">
import { defineComponent } from 'vue'
import { useRxicon } from '@/hooks/hook-icon'
import { useCompute } from '@/hooks/hook-compute'
import { httpMobile } from '@/api/fetch-core'
import { router } from '@/router'
import { useEnter } from '@/utils/utils-event'

export default defineComponent({
    name: 'Register',
    setup() {
        const { compute } = useRxicon()
        const { formRef, rules, state, setState, startDuration } = useCompute()

        /**发送手机验证码**/
        const fetchMobile = () => {
            setState({ fetch: true }).then(async e => {
                try {
                    await httpMobile({ mobile: e.mobile })
                    setState({ fetch: false }).then(() => startDuration(60))
                } catch (e) {
                    setState({ fetch: false })
                }
            })
        }

        const onSubmit = async () => {
            try {
                await formRef.value?.validate()
                await setState({ loading: true })
                // await register({
                //     nickname: state.nickname,
                //     password: state.password,
                //     email: state.email,
                //     code: state.code
                // }).then(() => {
                //     router.replace('/')
                // })
            } catch (e) {
                setState({ loading: false })
            }
        }

        return () => {
            return (
                <div>
                    <h2>注 册</h2>
                    <n-form ref={formRef} model={state} rules={rules.value} label-placement="left">
                        <n-form-item path="nickname">
                            <n-input
                                v-model:value={state.nickname}
                                size="medium"
                                placeholder="用户昵称"
                                input-props={{ autocomplete: 'off' }}
                                onKeydown={(e: KeyboardEvent) => useEnter(e, 'Enter', onSubmit)}
                            >
                                {{ prefix: () => <n-icon component={compute('UserOutlined')}></n-icon> }}
                            </n-input>
                        </n-form-item>
                        <n-form-item path="password">
                            <n-input
                                v-model:value={state.password}
                                size="medium"
                                type="password"
                                placeholder="密码"
                                show-password-on="mousedown"
                                input-props={{ autocomplete: 'new-password' }}
                                onKeydown={(e: KeyboardEvent) => useEnter(e, 'Enter', onSubmit)}
                            >
                                {{ prefix: () => <n-icon component={compute('LockOutlined')}></n-icon> }}
                            </n-input>
                        </n-form-item>
                        <n-form-item path="mobile">
                            <n-input
                                v-model:value={state.mobile}
                                size="medium"
                                maxlength={11}
                                placeholder="手机号"
                                input-props={{ autocomplete: 'off' }}
                                onKeydown={(e: KeyboardEvent) => useEnter(e, 'Enter', onSubmit)}
                            >
                                {{ prefix: () => <n-icon component={compute('PhoneOutlined')}></n-icon> }}
                            </n-input>
                            <n-button
                                size="medium"
                                class="naive-customize"
                                ghost
                                style={{ marginLeft: '10px' }}
                                disabled={state.duration > 0}
                                loading={state.fetch}
                                onClick={fetchMobile}
                            >
                                {{ default: () => (state.duration > 0 ? `${state.duration}秒后重试` : '发送验证码') }}
                            </n-button>
                        </n-form-item>
                        <n-form-item path="code">
                            <n-input
                                v-model:value={state.code}
                                size="medium"
                                placeholder="验证码"
                                input-props={{ autocomplete: 'off' }}
                                onKeydown={(e: KeyboardEvent) => useEnter(e, 'Enter', onSubmit)}
                            >
                                {{ prefix: () => <n-icon component={compute('VerifiedOutlined')}></n-icon> }}
                            </n-input>
                        </n-form-item>
                        <n-form-item show-feedback={false}>
                            <n-button
                                class="antd-submit"
                                type="info"
                                size="medium"
                                round
                                loading={state.loading}
                                onClick={onSubmit}
                            >
                                提 交
                            </n-button>
                        </n-form-item>
                    </n-form>
                </div>
            )
        }
    }
})
</script>
