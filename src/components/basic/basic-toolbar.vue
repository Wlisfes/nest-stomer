<script lang="tsx">
import { defineComponent, Fragment } from 'vue'
import { useLocale } from '@/hooks/hook-locale'
import { useRxicon } from '@/hooks/hook-icon'

export default defineComponent({
    name: 'BasicToolbar',
    setup(props, { slots, emit }) {
        const { t } = useLocale()
        const { Icon, compute } = useRxicon()

        return () => (
            <n-space class="basic-toolbar" size={[10, 8]} wrap-item={false}>
                <Fragment>{slots.start?.()}</Fragment>
                <Fragment>{slots.end?.()}</Fragment>
                <n-tooltip trigger="hover">
                    {{
                        trigger: () => (
                            <global-scale class="global-scale" max-width={18} scale={1} cursor="pointer">
                                <Icon component={compute('ReloadOutlined')} size={18} style={{ margin: 'auto' }}></Icon>
                            </global-scale>
                        ),
                        default: () => <span class="no-selecter">{t('common.confirm.value')}</span>
                    }}
                </n-tooltip>
                <n-tooltip trigger="hover">
                    {{
                        trigger: () => (
                            <global-scale class="global-scale" max-width={18} scale={1} cursor="pointer">
                                <Icon component={compute('SettingOutlined')} size={18} style={{ margin: 'auto' }}></Icon>
                            </global-scale>
                        ),
                        default: () => <span class="no-selecter">{t('common.confirm.value')}</span>
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

    :deep(.global-scale) {
        margin: auto 0;
        margin: auto 0;
        .n-icon {
            transition: color 0.3s var(--cubic-bezier-ease-in-out);
            &:hover {
                color: var(--primary-color);
            }
        }
    }
}
</style>
