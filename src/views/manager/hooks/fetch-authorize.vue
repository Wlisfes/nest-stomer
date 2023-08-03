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
import { httpBearerAuthorize, httpUpdateAuthorize } from '@/api/http-user'
import { httpColumnRoute, type IRoute } from '@/api/http-route'

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
                    nickname: undefined,
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
                await setState({ visible: true, loading: true })
                return await createRequest({
                    execute: async () => {
                        await fetchColumnRoute()
                        const { data } = await httpBearerAuthorize({ uid: props.uid })
                    },
                    finally: e => setState({ loading: false })
                })
            }
        )

        /**菜单、权限树**/ //prettier-ignore
        function fetchColumnRoute() {
            return httpColumnRoute().then(async ({ data }) => {
                return await setState({
                    option: { ...state.option, route: data.list }
                })
            }).catch(e => {})
        }

        /**表单验证**/
        async function onSubmit() {
            await divineFormValidater()
            return await createRequest({
                execute: async () => {
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
                },
                catch: async e => {
                    return await createNotice({
                        type: 'error',
                        title: e.message,
                        onAfterEnter: () => setState({ loading: false })
                    })
                }
            })
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
                    <n-form-item label={t('middle.nickname.value')} path="nickname">
                        <n-input v-model:value={state.form.nickname} placeholder={t('middle.nickname.placeholder')} />
                    </n-form-item>
                    <n-form-item label={t('middle.nickname.value')}>
                        <n-tree
                            label-field="title"
                            key-field="id"
                            block-line
                            cascade
                            checkable
                            style={{ width: '100%' }}
                            data={state.option.route}
                            render-label={(e: any) => <span>{`${e.option.title} - ${e.option.id}`}</span>}
                            on-update:checked-keys={(keys: Array<number>) => (state.form.checked = keys)}
                            on-update:indeterminate-keys={(keys: Array<number>) => (state.form.indeterminate = keys)}
                        />
                    </n-form-item>
                </n-form>
            </n-modal>
        )
    }
})
</script>
