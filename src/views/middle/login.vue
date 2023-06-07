<script lang="tsx">
import type { FormInst, FormRules, FormItemRule } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { useState } from '@/hooks/hook-state'
import { useLocale } from '@/locale/instance'
interface FormState {
    loading: boolean
    rules: FormRules
    form: {
        mobile: string | undefined | null
        password: string | undefined | null
        code: string | undefined | null
    }
}

export default defineComponent({
    name: 'Login',
    setup() {
        const formRef = ref<FormInst>()
        const { t } = useLocale()
        const { state, setState } = useState<FormState>({
            loading: false,
            form: {
                mobile: undefined,
                password: undefined,
                code: undefined
            },
            rules: {
                mobile: [
                    { required: true, trigger: ['blur', 'change'], message: '11111111' },
                    { trigger: ['blur', 'change'], pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '222222222' }
                ],
                // mobile: {
                //     key: 'mobile',
                //     required: true,
                //     trigger: 'blur',
                //     validator: (rule, value) => {
                //         if (!value) {
                //             return new Error()
                //         } else if (!/^(?:(?:\+|00)86)?1\d{10}$/.test(value)) {
                //             return new Error()
                //         }
                //         return true
                //     }
                // },
                password: {
                    key: 'password',
                    required: true,
                    trigger: 'blur',
                    validator: (rule, value) => {
                        if (!value) {
                            return new Error()
                        } else if (value.length < 6 || value.length > 18) {
                            return new Error()
                        }
                        return true
                    }
                },
                code: { key: 'code', required: true, message: '', trigger: 'blur' }
            }
        })

        async function onSubmit() {
            try {
                await formRef.value?.validate()
            } catch (e) {}
        }

        return () => (
            <div>
                <n-form ref={formRef} model={state.form} rules={state.rules} label-placement="left">
                    <n-form-item path="mobile">
                        <n-input
                            v-model:value={state.form.mobile}
                            maxlength={11}
                            type="text"
                            size="medium"
                            input-props={{ autocomplete: 'off' }}
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
                        ></n-input>
                    </n-form-item>
                    <n-form-item path="code">
                        <n-input size="medium" maxlength={4} input-props={{ autocomplete: 'off' }}></n-input>
                        <common-scale max-width={120} scale={120 / 50} style={{ marginLeft: '10px', cursor: 'pointer' }}>
                            <n-image preview-disabled style={{ borderRadius: '2px' }}>
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
                        <n-button class="antd-submit" type="info" size="medium" loading={state.loading} onClick={onSubmit}>
                            {111111111}
                        </n-button>
                    </n-form-item>
                </n-form>
            </div>
        )
    }
})
</script>
