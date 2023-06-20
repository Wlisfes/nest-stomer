<script lang="tsx">
import { defineComponent, computed, type PropType, type CSSProperties } from 'vue'
import { type DataTableBaseColumn } from 'naive-ui'

export default defineComponent({
    name: 'CommonSource',
    props: {
        dataColumn: { type: Array as PropType<Array<DataTableBaseColumn>>, default: () => [] },
        dataSource: { type: Array as PropType<Array<Record<string, unknown>>>, default: () => [] },
        total: { type: Number, default: 0 },
        loading: { type: Boolean, default: true },
        width: { type: Number, default: 640 },
        header: { type: Boolean, default: false },
        device: { type: String as PropType<'PC' | 'IPAD' | 'MOBILE'>, default: 'PC' }
    },
    setup(props, { slots }) {
        const cameStyle = computed<CSSProperties>(() => ({
            minWidth: props.width + 'px'
        }))
        return () => (
            <section class={{ 'common-source': true, 'is-mobile': props.device === 'MOBILE' }}>
                <n-scrollbar x-scrollable>
                    {props.loading && props.total === 0 ? (
                        <n-spin stroke-width={12} size={60} style={{ minHeight: '240px' }}></n-spin>
                    ) : !props.loading && props.total === 0 ? (
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
                        <div class="common-source__container" style={cameStyle.value}>
                            {props.dataSource.map(item => {
                                return slots.default ? slots.default(item) : null
                            })}
                        </div>
                    )}
                </n-scrollbar>
            </section>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-source {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    &__container {
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: column;
        row-gap: 12px;
        box-sizing: border-box;
        padding: 16px 16px 48px;
    }
}
</style>
