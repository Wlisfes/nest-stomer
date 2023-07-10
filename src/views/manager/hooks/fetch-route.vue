<script lang="tsx">
import { defineComponent, h, type PropType } from 'vue'
import { type SelectOption } from 'naive-ui'
import { useCurrent } from '@/locale/instance'
import { Observer } from '@/utils/utils-observer'
import { createRequest } from '@/utils/utils-request'
import { divineParameter } from '@/utils/utils-common'
import { createNotice } from '@/utils/utils-naive'
import { compute, RemixUI, type INameUI } from '@/utils/utils-remix'
import { useCustomize } from '@/hooks/hook-customize'
import { httpColumnRoute, httpBasicRoute } from '@/api/http-route'

export default defineComponent({
    name: 'FetchRoute',
    props: {
        observer: { type: Object as PropType<Observer<Record<string, unknown>>>, required: true },
        title: { type: String, required: true },
        command: { type: String as PropType<'CREATE' | 'UPDATE'>, default: 'CREATE' },
        id: { type: Number },
        parent: { type: Number }
    },
    emits: ['close', 'submit'],
    setup(props, { emit }) {
        // const dataRemix = computed(() => Object.keys(RemixUI).map())
        const { t, tm } = useCurrent()
        const { formRef, state, setState, divineFormValidater } = useCustomize(
            {
                immediate: true,
                visible: false,
                loading: false,
                form: {
                    title: undefined,
                    type: undefined,
                    path: undefined,
                    redirect: undefined,
                    order: 1,
                    status: undefined,
                    icon: undefined
                },
                rules: {}
            },
            /**初始化数据**/
            async function mounte() {
                await setState({ visible: true, loading: props.command === 'UPDATE' })
                return await createRequest({
                    execute: async function () {
                        if (state.loading) {
                            const { data } = await httpBasicRoute({ id: props.id as number })
                            console.log(data)
                            return await setState({
                                loading: false,
                                form: await divineParameter({
                                    // method: data.method,
                                    // name: data.name,
                                    // path: data.path,
                                    // status: data.status,
                                    // parent: data.parent.id
                                })
                            })
                        }
                    },
                    finally: e => setState({ loading: false })
                })
            }
        )

        /**表单验证**/
        function onSubmit() {}

        return () => (
            <n-modal
                v-model:show={state.visible}
                auto-focus={false}
                show-icon={false}
                mask-closable={false}
                title={props.title}
                preset="dialog"
                class="el-customize"
                style={{ width: '960px' }}
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
                    <n-grid cols={2} x-gap={16}>
                        <n-grid-item>
                            <n-form-item label={t('route.title.value')} path="title">
                                <n-input v-model:value={state.form.title} clearable placeholder={t('route.title.placeholder')} />
                            </n-form-item>
                        </n-grid-item>
                        <n-grid-item>
                            <n-form-item label={t('route.type.value')} path="type">
                                <n-select
                                    v-model:value={state.form.type}
                                    placeholder={t('route.type.placeholder')}
                                    options={tm('route.type.column')}
                                />
                            </n-form-item>
                        </n-grid-item>
                        <n-grid-item>
                            <n-form-item label={t('route.path.value')} path="path">
                                <n-input v-model:value={state.form.path} clearable placeholder={t('route.path.placeholder')} />
                            </n-form-item>
                        </n-grid-item>
                        <n-grid-item>
                            <n-form-item label={t('route.redirect.value')} path="redirect">
                                <n-input v-model:value={state.form.redirect} clearable placeholder={t('route.redirect.placeholder')} />
                            </n-form-item>
                        </n-grid-item>
                        <n-grid-item>
                            <n-form-item label={t('route.order.value')} path="order">
                                <n-input-number
                                    v-model:value={state.form.order}
                                    placeholder={t('route.order.placeholder')}
                                    style={{ width: '100%' }}
                                />
                            </n-form-item>
                        </n-grid-item>
                        <n-grid-item>
                            <n-form-item label={t('common.status.value')} path="status">
                                <n-select
                                    v-model:value={state.form.status}
                                    placeholder={t('common.status.placeholder')}
                                    options={tm('common.status.column')}
                                />
                            </n-form-item>
                        </n-grid-item>
                        <n-grid-item>
                            <n-form-item label={t('route.icon.value')} path="icon">
                                <n-select
                                    v-model:value={state.form.icon}
                                    filterable
                                    placeholder={t('route.icon.placeholder')}
                                    options={Object.keys(RemixUI).map(value => ({ value, label: value }))}
                                    render-tag={({ option }: { option: SelectOption }) => {
                                        return h('div', { class: 'n-basic n-center' }, [
                                            <n-icon size={24} component={compute(option.value as INameUI)} />,
                                            <n-text style={{ marginLeft: '5px' }}>{option.value}</n-text>
                                        ])
                                    }}
                                />
                            </n-form-item>
                        </n-grid-item>
                    </n-grid>
                </n-form>
            </n-modal>
        )
    }
})
</script>
