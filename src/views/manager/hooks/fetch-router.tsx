import { onMounted, ref } from 'vue'

import { FormInst, FormRules } from 'naive-ui'
import { useState } from '@/hooks/hook-state'
import { createComponent } from '@/utils/utils-app'
import { Observer } from '@/utils/utils-observer'

export function fetchRouter() {
    const observer = new Observer<Record<string, unknown>>()
    const { el, mounte, unmount } = createComponent({
        name: 'FetchRouter',
        setup() {
            const formRef = ref<FormInst>()
            const { form, rules, state, setState } = useState({
                visible: false,
                loading: false,
                form: {},
                rules: {}
            })
            // const rules: FormRules = {
            //     version: [{ required: true, type: 'number', message: '请输入资源版本号', trigger: 'change' }],
            //     name: [{ required: true, message: '请上传资源文件', trigger: 'change' }]
            // }

            onMounted(() => setState({ visible: true }))

            return () => (
                <n-modal v-model:show={state.visible} to={el}>
                    <n-spin show={state.loading}>
                        <n-form
                            ref={formRef}
                            model={state}
                            rules={rules}
                            disabled={state.loading}
                            label-placement="left"
                            require-mark-placement="left"
                            label-width={85}
                            style={{ margin: '24px 0' }}
                        ></n-form>
                    </n-spin>
                </n-modal>
            )
        }
    })

    mounte().catch(e => console.error(e))

    return { observer }
}
