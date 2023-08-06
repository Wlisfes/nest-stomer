<script lang="tsx">
import { defineComponent } from 'vue'
import { useCurrent } from '@/locale/instance'
import { divineAsyncBatch } from '@/utils/utils-common'
import { createNotice } from '@/utils/utils-naive'
import { useCustomize } from '@/hooks/hook-customize'
import { httpBearerAuthorize, httpUpdateAuthorize } from '@/api/http-user'
import { httpOptionsRoute, type IRoute } from '@/api/http-route'

export default defineComponent({
    name: 'FetchAuthorize',
    props: {
        uid: { type: Number, required: true }
    },
    emits: ['close', 'submit'],
    setup(props, { emit }) {
        const { t, tm } = useCurrent()
        const { formRef, state, setState, divineFormValidater } = useCustomize(
            {
                immediate: true,
                visible: false,
                loading: false,
                form: {
                    pattern: '',
                    checked: [] as Array<number>,
                    indeterminate: [] as Array<number>
                },
                rules: {
                    nickname: { required: true, message: t('rule.method.placeholder'), trigger: 'change' }
                },
                option: {
                    route: [] as Array<IRoute>
                }
            },
            /**初始化数据**/
            async function mounte() {
                try {
                    await setState({ visible: true, loading: true })
                    await divineAsyncBatch([fetchBearerAuthorize, fetchOptionsRoute])
                    await setState({ loading: false })
                } catch (e) {}
            }
        )

        /**用户权限信息**/
        function fetchBearerAuthorize() {
            return httpBearerAuthorize({ uid: props.uid }).then(async ({ data }) => {
                const checked = data.routes.filter(x => x.isLeaf).map(x => x.id)
                const indeterminate = data.routes.filter(x => !x.isLeaf).map(x => x.id)
                return await setState({
                    form: { pattern: state.form.pattern, checked, indeterminate }
                })
            })
        }

        /**菜单、权限树**/ //prettier-ignore
        function fetchOptionsRoute() {
            return httpOptionsRoute().then(async ({ data }) => {
                return await setState({
                    option: { ...state.option, route: data.list }
                })
            }).catch(e => {})
        }

        /**表单验证**/
        async function onSubmit() {
            await divineFormValidater()
            try {
                await setState({ loading: true })
                return await httpUpdateAuthorize({
                    uid: props.uid,
                    route: [...new Set([...state.form.checked, ...state.form.indeterminate])]
                }).then(async ({ message }) => {
                    return await createNotice({
                        type: 'success',
                        title: message,
                        onAfterEnter: () => emit('submit', { done: setState })
                    })
                })
            } catch (e) {
                return await createNotice({
                    type: 'error',
                    title: e.message,
                    onAfterEnter: () => setState({ loading: false })
                })
            }
        }

        return () => (
            <n-modal
                v-model:show={state.visible}
                auto-focus={false}
                show-icon={false}
                mask-closable={false}
                title="编辑用户权限"
                preset="dialog"
                class="el-customize"
                style={{ width: '750px' }}
                onAfterLeave={() => emit('close')}
                action={() => (
                    <common-inspector
                        disabled={state.loading}
                        onCancel={() => setState({ visible: false })}
                        onSubmit={onSubmit}
                    ></common-inspector>
                )}
            >
                <n-spin show={state.loading}>
                    <n-form
                        ref={formRef}
                        model={state.form}
                        rules={state.rules}
                        disabled={state.loading}
                        label-placement="top"
                        require-mark-placement="left"
                        style={{ minHeight: '200px' }}
                    >
                        <n-form-item show-feedback={false}>
                            <n-input v-model:value={state.form.pattern} clearable placeholder={t('common.search.value')}></n-input>
                        </n-form-item>
                        <n-form-item>
                            <n-tree
                                label-field="title"
                                key-field="id"
                                block-line
                                cascade
                                checkable
                                show-irrelevant-nodes={false}
                                style={{ width: '100%' }}
                                pattern={state.form.pattern}
                                data={state.option.route}
                                checked-keys={state.form.checked}
                                on-update:checked-keys={(keys: Array<number>) => (state.form.checked = keys)}
                                on-update:indeterminate-keys={(keys: Array<number>) => (state.form.indeterminate = keys)}
                            />
                        </n-form-item>
                    </n-form>
                </n-spin>
            </n-modal>
        )
    }
})
</script>
