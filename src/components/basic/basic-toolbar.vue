<script lang="tsx">
import { defineComponent, Fragment, computed, PropType } from 'vue'
import { useLocale } from '@/hooks/hook-locale'
import { useRxicon } from '@/hooks/hook-icon'

export default defineComponent({
    name: 'BasicToolbar',
    props: {
        density: {
            type: String as PropType<'small' | 'medium' | 'large'>,
            default: 'medium'
        },
        setState: {
            type: Function
        }
    },
    emits: ['reload'],
    setup(props, { slots, emit }) {
        const { t, tm } = useLocale()
        const { Icon, compute } = useRxicon()
        const have = computed(() => [slots.start, slots.end].some(Boolean))

        return () => (
            <n-space class="basic-toolbar" size={[10, 8]} wrap-item={false}>
                <Fragment>{slots.start?.()}</Fragment>
                <Fragment>{slots.end?.()}</Fragment>

                <n-tooltip trigger="hover">
                    {{
                        default: () => <span class="no-selecter">{t('common.refresh.value')}</span>,
                        trigger: () => (
                            <global-scale
                                class={{ 'global-scale no-selecter': true, 'is-customize': !have.value }}
                                max-width={18}
                                scale={1}
                                cursor="pointer"
                                onClick={() => emit('reload')}
                            >
                                <Icon component={compute('ReloadOutlined')} size={18} style={{ margin: 'auto' }}></Icon>
                            </global-scale>
                        )
                    }}
                </n-tooltip>
                <n-tooltip trigger="hover">
                    {{
                        default: () => <span class="no-selecter">{t('basic.toolbar.density.value')}</span>,
                        trigger: () => (
                            <global-scale class="global-scale no-selecter" max-width={18} scale={1} cursor="pointer">
                                <n-popselect
                                    value={props.density}
                                    trigger="click"
                                    options={tm('basic.toolbar.density.column')}
                                    on-update:value={(density: string) => props.setState?.({ density })}
                                >
                                    <Icon component={compute('ColumnHeightOutlined')} size={18} style={{ margin: 'auto' }}></Icon>
                                </n-popselect>
                            </global-scale>
                        )
                    }}
                </n-tooltip>
                <n-tooltip trigger="hover">
                    {{
                        default: () => <span class="no-selecter">{t('basic.toolbar.setting.value')}</span>,
                        trigger: () => (
                            <global-scale class="global-scale no-selecter" max-width={18} scale={1} cursor="pointer">
                                <Icon component={compute('SettingOutlined')} size={18} style={{ margin: 'auto' }}></Icon>
                            </global-scale>
                        )
                    }}
                </n-tooltip>
            </n-space>
        )
    }
})
</script>

<style lang="scss" scoped>
.basic-toolbar {
    position: relative;
    overflow: hidden;
    margin-bottom: 10px;

    :deep(.n-button.n-start) {
        margin-right: auto;
    }
    :deep(.n-button.n-end) {
        margin-left: auto;
    }
    :deep(.global-scale) {
        margin: auto 0;
        margin: auto 0;
        &.is-customize {
            margin-left: auto;
        }
        .n-icon {
            transition: color 0.3s var(--cubic-bezier-ease-in-out);
            &:hover {
                color: var(--primary-color);
            }
        }
    }
}
</style>
