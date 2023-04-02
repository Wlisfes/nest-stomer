import { onMounted, ref } from 'vue'
import { FormInst, FormRules } from 'naive-ui'
import { useState } from '@/hooks/hook-state'
import { createComponent } from '@/utils/utils-app'
import { Observer } from '@/utils/utils-observer'
import { transfer } from '@/utils/utils-transfer'

export function fetchRouter() {
    const observer = new Observer<Record<string, unknown>>()
    const { el, mounte, unmount } = createComponent({
        name: 'FetchRouter',
        setup() {
            const formRef = ref<FormInst>()
            const { form, rules, state, setState } = useState({
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

            const onAfterEnter = (el: HTMLElement) => {
                const screenWidth = document.body.clientWidth //body当前宽度
                const screenHeight = document.documentElement.clientHeight //可见区域高度

                const elWidth = el.offsetWidth //对话框宽度
                const elHeight = el.offsetHeight //对话框高度
                const minDomLeft = el.offsetLeft
                const minDomTop = el.offsetTop

                const { width, height, left, top } = el.getBoundingClientRect()
                const element = el.querySelector('.n-dialog__title') as HTMLElement

                element.onmousedown = e => {
                    console.log({
                        clientX: e.clientX,
                        clientY: e.clientY
                    })
                }

                document.onmouseup = e => {
                    console.log(e)
                }
            }

            onMounted(() => setState({ visible: true }))

            return () => (
                <n-modal
                    v-model:show={state.visible}
                    closable={true}
                    auto-focus={false}
                    to={el}
                    transform-origin="mouse"
                    title="重置密码"
                    preset="dialog"
                    onAfterLeave={unmount}
                    onAfterEnter={transfer}
                >
                    <n-form
                        ref={formRef}
                        model={state}
                        rules={rules}
                        disabled={state.loading}
                        label-placement="left"
                        require-mark-placement="left"
                        label-width={85}
                        style={{ margin: '24px 0' }}
                    >
                        <n-form-item label="密码" path="password">
                            <n-input v-model:value={form.value.title} size="medium" placeholder="密码"></n-input>
                        </n-form-item>
                    </n-form>
                </n-modal>
            )
        }
    })

    mounte().catch(e => console.error(e))

    return { observer }
}
