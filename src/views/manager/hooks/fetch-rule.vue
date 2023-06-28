<script lang="tsx">
import { defineComponent, type PropType } from 'vue'
import { Observer } from '@/utils/utils-observer'
import { useCustomize } from '@/hooks/hook-customize'
import { useCurrent } from '@/locale/instance'
import { httpUpdateRule, type IRule } from '@/api/http-route'

export default defineComponent({
    name: 'FetchRule',
    props: {
        observer: { type: Object as PropType<Observer<Record<string, unknown>>>, required: true },
        title: { type: String, required: true },
        command: { type: String as PropType<'CREATE' | 'UPDATE'>, default: 'CREATE' },
        id: { type: Number },
        node: { type: Object as PropType<IRule> }
    },
    emits: ['close'],
    setup(props, { emit }) {
        const { t, tm } = useCurrent()
        const { formRef, state, setState, divineFormValidater } = useCustomize(
            {
                immediate: true,
                loading: false,
                visible: false,
                form: {
                    method: props.node?.method,
                    name: props.node?.name,
                    path: props.node?.path,
                    status: props.node?.status
                },
                rules: {
                    method: { required: true, message: t('rule.method.placeholder'), trigger: 'change' },
                    name: { required: true, message: t('rule.name.placeholder'), trigger: 'blur' },
                    path: { required: true, message: t('rule.path.placeholder'), trigger: 'blur' },
                    status: { required: true, message: t('common.status.placeholder'), trigger: 'change' }
                }
            },
            () => {
                setState({ visible: true })
            }
        )

        /**表单验证**/
        function onSubmit() {
            divineFormValidater(async () => {
                try {
                    await setState({ loading: true })
                    const { data } = await httpUpdateRule({
                        id: props.node?.id,
                        status: state.form.status,
                        name: state.form.name,
                        path: state.form.path,
                        method: state.form.method,
                        parent: 3
                    })
                    window.$notification.success({
                        title: data.message,
                        duration: 2500,
                        onAfterEnter: () => {
                            props.observer.emit('submit', { done: setState })
                        }
                    })
                } catch (e) {
                    setState({ loading: false }).finally(() => {
                        window.$notification.error({ title: e.message, duration: 2500 })
                    })
                }
            }).catch(e => {})
        }

        return () => (
            <n-modal
                v-model:show={state.visible}
                auto-focus={false}
                show-icon={false}
                mask-closable={false}
                title={props.title}
                preset="dialog"
                class="el-customize"
                style={{ width: '640px' }}
                onAfterLeave={() => emit('close')}
                action={() => (
                    <common-inspector
                        loading={state.loading}
                        onCancel={() => setState({ visible: false })}
                        onSubmit={onSubmit}
                    ></common-inspector>
                )}
            >
                <n-form
                    ref={formRef}
                    model={state.form}
                    rules={state.rules}
                    disabled={state.loading}
                    label-placement="top"
                    require-mark-placement="left"
                >
                    <n-form-item label={t('rule.method.value')} path="method">
                        <n-select
                            v-model:value={state.form.method}
                            placeholder={t('rule.method.placeholder')}
                            options={tm('rule.method.column')}
                        />
                    </n-form-item>
                    <n-form-item label={t('rule.name.value')} path="name">
                        <n-input v-model:value={state.form.name} clearable placeholder={t('rule.name.placeholder')}></n-input>
                    </n-form-item>
                    <n-form-item label={t('rule.path.value')} path="path">
                        <n-input v-model:value={state.form.path} clearable placeholder={t('rule.path.placeholder')}></n-input>
                    </n-form-item>
                    <n-form-item label={t('common.status.value')} path="status">
                        <n-select
                            v-model:value={state.form.status}
                            placeholder={t('common.status.placeholder')}
                            options={tm('common.status.column')}
                        />
                    </n-form-item>
                </n-form>
            </n-modal>
        )
    }
})
</script>
