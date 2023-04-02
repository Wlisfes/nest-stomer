import { onMounted, ref } from 'vue'
import { FormInst, FormRules } from 'naive-ui'
import { useState } from '@/hooks/hook-state'
import { createComponent } from '@/utils/utils-app'
import { Observer } from '@/utils/utils-observer'
import { transfer } from '@/utils/utils-transfer'
import { httpColumn, IRoute } from '@/api/fetch-route'
interface Option {
    title: string
    command: 'CREATE' | 'UPDATE'
    id?: number
}

export function fetchRouter(option: Option) {
    const observer = new Observer<Record<string, unknown>>()
    const { el, mounte, unmount } = createComponent({
        name: 'FetchRouter',
        setup() {
            const formRef = ref<FormInst>()
            const { state, setState } = useState({
                visible: false,
                loading: false,
                form: {
                    title: undefined
                },
                rules: {}
            })
            // const rules: FormRules = {
            //     version: [{ required: true, type: 'number', message: '请输入资源版本号', trigger: 'change' }],
            //     name: [{ required: true, message: '请上传资源文件', trigger: 'change' }]
            // }

            onMounted(() => {
                setState({ visible: true })
            })

            return () => (
                <n-modal
                    v-model:show={state.visible}
                    auto-focus={false}
                    show-icon={false}
                    to={el}
                    title={option.title}
                    transform-origin="mouse"
                    preset="dialog"
                    onAfterLeave={unmount}
                    onAfterEnter={transfer}
                >
                    <n-spin show={state.loading}>
                        <n-form ref={formRef} model={state.form} rules={state.rules} disabled={state.loading} style={{ marginTop: '28px' }}>
                            <n-form-item label="密码" path="password">
                                <n-input v-model:value={state.form.title} placeholder="密码"></n-input>
                            </n-form-item>
                        </n-form>
                    </n-spin>
                </n-modal>
            )
        }
    })

    mounte().catch(e => console.error(e))

    return { observer }
}
