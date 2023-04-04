import { onMounted, ref } from 'vue'
import { FormInst, FormRules } from 'naive-ui'
import { useProvider } from '@/hooks/hook-provider'
import { useState } from '@/hooks/hook-state'
import { useLocale } from '@/hooks/hook-locale'
import { useRxicon } from '@/hooks/hook-icon'
import { createComponent } from '@/utils/utils-app'
import { Observer } from '@/utils/utils-observer'
import { transfer } from '@/utils/utils-transfer'
import { httpColumn, IRoute } from '@/api/fetch-route'
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
            const { vars } = useProvider()
            const { t, tm } = useLocale()
            const { Icon, antd, FCompute, NCompute } = useRxicon()
            const { state, setState } = useState({
                visible: false,
                loading: false,
                type: 'directory',
                title: undefined,
                path: undefined,
                redirect: undefined,
                status: 'enable',
                icon: 'AccountBookFilled',
                popover: false
            })
            const rules: FormRules = {
                type: { required: true, message: t('route.type.placeholder'), trigger: 'blur' }
            }

            function onUnmounte() {
                unmount(() => setState({ visible: false }))
            }

            const onSubmit = () => {
                setState({ loading: true })
            }

            onMounted(() => {
                setState({ visible: true })

                console.log(vars.value)
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
                    onAfterLeave={onUnmounte}
                    onAfterEnter={transfer}
                    action={() => (
                        <n-space class="n-stomer">
                            <n-button onClick={onUnmounte}>{t('common.cancel.value')}</n-button>
                            <n-button type="primary" onClick={onSubmit}>
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
                                <n-popover
                                    show={state.popover}
                                    trigger="focus"
                                    width="trigger"
                                    scrollable
                                    style={{ maxHeight: '240px' }}
                                    content-style={{ padding: '16px 0' }}
                                >
                                    {{
                                        trigger: () => (
                                            <n-input
                                                v-model:value={state.icon}
                                                clearable
                                                readonly
                                                placeholder={t('route.icon.placeholder')}
                                                onClick={() => setState({ popover: true })}
                                            >
                                                {{ suffix: FCompute('DownOutlined') }}
                                            </n-input>
                                        ),
                                        default: () => (
                                            <n-space size={14} wrap-item={false} justify="space-between" style={{ padding: '0 16px' }}>
                                                {Object.values(antd).map((SVGIcon, index) => {
                                                    if (index > 100) return null
                                                    return (
                                                        <n-button
                                                            key={SVGIcon.name}
                                                            style={{
                                                                padding: 0,
                                                                width: '48px',
                                                                height: '48px',
                                                                backgroundColor: 'var(--n-color-hover)',
                                                                color:
                                                                    state.icon === SVGIcon.name
                                                                        ? 'var(--n-text-color-focus)'
                                                                        : 'var(--n-text-color)'
                                                            }}
                                                        >
                                                            <Icon size={28} component={SVGIcon}></Icon>
                                                        </n-button>
                                                    )
                                                })}
                                            </n-space>
                                        )
                                    }}
                                </n-popover>
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
