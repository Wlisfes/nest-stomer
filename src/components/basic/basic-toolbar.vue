<script lang="tsx">
import { defineComponent, ref, Fragment, computed, PropType } from 'vue'
import { useLocale } from '@/hooks/hook-locale'
import { useRxicon } from '@/hooks/hook-icon'

export default defineComponent({
    name: 'BasicToolbar',
    props: {
        size: {
            type: String as PropType<'small' | 'medium' | 'large'>,
            default: 'medium'
        }
    },
    emits: ['reload'],
    setup(props, { slots, emit }) {
        const u = ref('medium')
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
                        default: () => <span class="no-selecter">{t('basic.toolbar.size.value')}</span>,
                        trigger: () => (
                            <global-scale class="global-scale no-selecter" max-width={18} scale={1} cursor="pointer">
                                <n-dropdown show-arrow trigger="click" key-field="value" options={tm('basic.toolbar.size.column')}>
                                    <Icon component={compute('ColumnHeightOutlined')} size={18} style={{ margin: 'auto' }}></Icon>
                                </n-dropdown>
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
