<script lang="tsx">
import { defineComponent, type PropType } from 'vue'
import { useCurrent } from '@/locale/instance'
import { Observer } from '@/utils/utils-observer'
import { createRequest } from '@/utils/utils-request'
import { divineParameter } from '@/utils/utils-common'
import { createNotice } from '@/utils/utils-naive'
import { useCustomize } from '@/hooks/hook-customize'
import { httpCreateRule, httpUpdateRule, httpBasicRule } from '@/api/http-route'

export default defineComponent({
    name: 'FetchRule',
    props: {
        observer: { type: Object as PropType<Observer<Record<string, unknown>>>, required: true },
        title: { type: String, required: true },
        command: { type: String as PropType<'CREATE' | 'UPDATE'>, default: 'CREATE' },
        id: { type: Number },
        parent: { type: Number }
    },
    emits: ['close', 'submit'],
    setup(props, { emit }) {
        const { t, tm } = useCurrent()
        const { formRef, state, setState, divineFormValidater } = useCustomize(
            {
                immediate: true,
                loading: false,
                visible: false,
                form: {
                    method: undefined,
                    name: undefined,
                    path: undefined,
                    status: undefined,
                    parent: props.parent ?? undefined
                },
                rules: {
                    method: { required: true, message: t('rule.method.placeholder'), trigger: 'change' },
                    name: { required: true, message: t('rule.name.placeholder'), trigger: 'blur' },
                    path: { required: true, message: t('rule.path.placeholder'), trigger: 'blur' },
                    status: { required: true, message: t('common.status.placeholder'), trigger: 'change' }
                }
            },
            /**初始化数据**/
            async function mounte() {
                await setState({ visible: true, loading: props.command === 'UPDATE' })
                return await createRequest({
                    execute: async function () {
                        if (state.loading) {
                            const { data } = await httpBasicRule({ id: props.id as number })
                            return await setState({
                                loading: false,
                                form: await divineParameter({
                                    method: data.method,
                                    name: data.name,
                                    path: data.path,
                                    status: data.status,
                                    parent: data.parent.id
                                })
                            })
                        }
                    },
                    finally: e => setState({ loading: false })
                })
            }
        )

        /**表单验证**/
        function onSubmit() {
            divineFormValidater(async () => {
                return await createRequest({
                    execute: async () => {
                        await setState({ loading: true })
                        if (props.command === 'CREATE') {
                            /**创建接口规则**/
                            return await httpCreateRule(
                                await divineParameter({
                                    status: state.form.status,
                                    name: state.form.name,
                                    path: state.form.path,
                                    method: state.form.method,
                                    parent: state.form.parent
                                })
                            ).then(async ({ data }) => {
                                return await createNotice({
                                    type: 'success',
                                    title: data.message,
                                    onAfterEnter: () => emit('submit', { done: setState })
                                })
                            })
                        } else if (props.command === 'UPDATE') {
                            /**编辑接口规则**/
                            await httpUpdateRule(
                                await divineParameter({
                                    id: props.id,
                                    status: state.form.status,
                                    name: state.form.name,
                                    path: state.form.path,
                                    method: state.form.method,
                                    parent: state.form.parent
                                })
                            ).then(async ({ data }) => {
                                return await createNotice({
                                    type: 'success',
                                    title: data.message,
                                    onAfterEnter: () => emit('submit', { done: setState })
                                })
                            })
                        }
                        return state
                    },
                    catch: async e => await createNotice({ type: 'error', title: e.message })
                })
            })
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
