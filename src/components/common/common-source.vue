<script lang="tsx">
import { defineComponent, computed, Fragment, type PropType, type CSSProperties, type VNodeChild } from 'vue'
import { type DataTableBaseColumn } from 'naive-ui'

export default defineComponent({
    name: 'CommonSource',
    props: {
        dataColumn: { type: Array as PropType<Array<DataTableBaseColumn>>, default: () => [] },
        dataSource: { type: Array as PropType<Array<Record<string, unknown>>>, default: () => [] },
        size: { type: Number, default: 10 },
        page: { type: Number, default: 1 },
        total: { type: Number, default: 0 },
        loading: { type: Boolean, default: true },
        width: { type: Number, default: 640 },
        dataRender: { type: Function as PropType<(e: Record<string, unknown>) => VNodeChild> }
    },
    setup(props, { slots }) {
        const cameStyle = computed<CSSProperties>(() => ({
            minWidth: props.width + 'px'
        }))
        return () => (
            <section class={{ 'common-source': true }}>
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
                        <Fragment>
                            <div class="common-source__container" style={cameStyle.value}>
                                {props.dataSource.map(item => {
                                    return slots.default ? slots.default(item) : props.dataRender ? props.dataRender(item) : null
                                })}
                            </div>
                            <div class="common-source__pagination">
                                <n-pagination page={props.page} page-size={props.size} page-count={props.total} />
                            </div>
                        </Fragment>
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
        padding: 16px 16px 32px;
    }
    &__pagination {
        display: flex;
        justify-content: center;
    }
}
</style>
