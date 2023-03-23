<script lang="tsx">
import { defineComponent, Fragment } from 'vue'
import { useRxicon } from '@/hooks/hook-icon'

export default defineComponent({
    name: 'BasicToolbar',
    setup(props, { slots, emit }) {
        const { Icon, compute } = useRxicon()

        return () => (
            <n-space size={[10, 8]} wrap-item={false}>
                <Fragment>{slots.start?.()}</Fragment>

                <n-tooltip trigger="hover">
                    {{
                        trigger: () => <Icon component={compute('ReloadOutlined')}></Icon>,
                        default: () => <n-text tag="span">刷新</n-text>
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
}
</style>
