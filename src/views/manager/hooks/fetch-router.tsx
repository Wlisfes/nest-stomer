import { onMounted, ref } from 'vue'
import { FormInst, FormRules } from 'naive-ui'
import { useProvider } from '@/hooks/hook-provider'
import { useState } from '@/hooks/hook-state'
import { useLocale } from '@/hooks/hook-locale'
import { useRxicon, INode } from '@/hooks/hook-icon'
import { createComponent } from '@/utils/utils-app'
import { Observer } from '@/utils/utils-observer'
import { transfer } from '@/utils/utils-transfer'
import { columnRoute, createRoute, IRoute } from '@/api/fetch-route'
interface Option {
    el?: HTMLElement
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
            const { t, tm } = useLocale()
            const { icon, Icon, compute } = useRxicon()
            const { state, setState } = useState({
                visible: false,
                loading: false,
                type: 'directory',
                title: undefined,
                path: undefined,
                redirect: undefined,
                status: 'enable',
                icon: undefined,
                parent: undefined
            })
            const rules: FormRules = {
                type: { required: true, message: t('route.type.placeholder'), trigger: 'blur' },
                title: { required: true, message: t('route.title.placeholder'), trigger: 'blur' },
                path: { required: true, message: t('route.path.placeholder'), trigger: 'blur' },
                status: { required: true, message: t('route.status.placeholder'), trigger: 'blur' }
            }

            function onSubmit() {
                formRef.value?.validate(err => {
                    if (err) return false
                    setState({ loading: true }).then(async () => {
                        try {
                            await createRoute({
                                type: state.type,
                                title: state.title,
                                path: state.path,
                                redirect: state.redirect,
                                status: state.status,
                                icon: state.icon,
                                parent: state.parent
                            })
                            setState({ loading: false, visible: false }).then(() => {
                                observer.emit('submit')
                            })
                        } catch (e) {
                            setState({ loading: false })
                        }
                    })
                })
            }

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
                    preset="dialog"
                    style={{ width: '640px' }}
                    onAfterLeave={unmount}
                    onAfterEnter={transfer}
                    action={() => (
                        <n-space class="n-stomer">
                            <n-button onClick={() => setState({ visible: false })}>{t('common.cancel.value')}</n-button>
                            <n-button type="primary" disabled={state.loading} loading={state.loading} onClick={onSubmit}>
                                {t('common.submit.value')}
                            </n-button>
                        </n-space>
                    )}
                >
                    <n-spin show={state.loading}>
                        <n-form
                            ref={formRef}
                            model={state}
                            rules={rules}
                            disabled={state.loading}
                            label-placement="left"
                            require-mark-placement="left"
                            label-width="120px"
                            class="n-customize n-stomer"
                        >
                            <n-form-item label={t('route.type.value')} path="type">
                                <n-radio-group v-model:value={state.type} name="type">
                                    <n-space>
                                        {tm('route.type.column').map(x => (
                                            <n-radio key={x.value} value={x.value}>
                                                {x.label}
                                            </n-radio>
                                        ))}
                                    </n-space>
                                </n-radio-group>
                            </n-form-item>
                            <n-form-item label={t('route.title.value')} path="title">
                                <n-input
                                    v-model:value={state.title}
                                    placeholder={t('route.title.placeholder')}
                                    class="n-customize"
                                ></n-input>
                            </n-form-item>
                            <n-form-item label={t('route.path.value')} path="path">
                                <n-input v-model:value={state.path} placeholder={t('route.path.placeholder')}></n-input>
                            </n-form-item>
                            <n-form-item label={t('route.redirect.value')}>
                                <n-input v-model:value={state.redirect} placeholder={t('route.redirect.placeholder')}></n-input>
                            </n-form-item>
                            <n-form-item label={t('route.status.value')} path="status">
                                <n-select
                                    v-model:value={state.status}
                                    placeholder={t('route.title.placeholder')}
                                    options={tm('common.status.column')}
                                />
                            </n-form-item>
                            <n-form-item label={t('route.icon.value')}>
                                <n-select
                                    label-field="name"
                                    value-field="name"
                                    placeholder={t('route.icon.placeholder')}
                                    v-model:value={state.icon}
                                    options={icon.value}
                                    filterable={true}
                                    render-label={(option: { name: INode }) => (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Icon size={28} component={compute(option.name)}></Icon>
                                            <n-text style={{ marginLeft: '10px' }}>{option.name}</n-text>
                                        </div>
                                    )}
                                />
                            </n-form-item>
                        </n-form>
                    </n-spin>
                </n-modal>
            )
        }
    })

    mounte(option.el).catch(e => console.error(e))

    return { observer }
}
