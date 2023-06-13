<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CommonContainer',
    props: {
        position: { type: String, default: 'is-absolute' },
        loading: { type: Boolean, default: false },
        empty: { tyep: Boolean, default: false },
        scrollbar: { type: Boolean, default: false }
    },
    setup(props, { slots }) {
        return () => (
            <section class={{ 'common-container': true, [props.position]: true }}>
                {slots.toolbar && <div class="common-container__toolbar">{slots.toolbar(props)}</div>}
                <div class="common-container__scrollbar">
                    {props.scrollbar ? (
                        <n-scrollbar x-scrollable>
                            {props.loading ? (
                                <n-spin stroke-width={12} size={60} style={{ minHeight: '240px' }}></n-spin>
                            ) : props.empty ? (
                                <n-empty style={{ minHeight: '240px', justifyContent: 'center' }}>
                                    {{
                                        default: () => (
                                            <n-text depth="3" style={{ fontSize: '20px' }}>
                                                暂无内容
                                            </n-text>
                                        )
                                    }}
                                </n-empty>
                            ) : (
                                slots.default?.(props)
                            )}
                        </n-scrollbar>
                    ) : (
                        slots.default?.(props)
                    )}
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
    &.is-absolute {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
    &__toolbar {
        position: relative;
        overflow: hidden;
        margin-bottom: 10px;
    }
    &__scrollbar {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
}
</style>
