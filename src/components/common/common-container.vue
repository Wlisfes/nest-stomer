<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CommonContainer',
    props: {
        position: {
            type: String,
            default: 'is-absolute'
        }
    },
    setup(props, { slots }) {
        return () => (
            <section class={{ 'common-container': true, [props.position]: true }}>
                {slots.toolbar && (
                    <div class="common-toolbar">
                        <n-space size={[10, 8]} wrap-item={false}>
                            {Array.from({ length: 30 }, () => (
                                <n-button type="primary">Primary</n-button>
                            ))}
                            <n-tooltip trigger="hover">
                                {{
                                    trigger: () => <span>1</span>,
                                    default: () => 'refresh'
                                }}
                            </n-tooltip>
                        </n-space>
                    </div>
                )}
                <div class="common-scrollbar">
                    <n-scrollbar x-scrollable>
                        <div style={{ minWidth: '1000px' }}>
                            {Array.from({ length: 100 }, () => (
                                <h1 type="primary">Primary</h1>
                            ))}
                        </div>
                    </n-scrollbar>
                </div>
            </section>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-container {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 16px;
    &.is-absolute {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
    .common-toolbar {
        position: relative;
        overflow: hidden;
        margin-bottom: 10px;
    }
    .common-scrollbar {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
}
</style>
