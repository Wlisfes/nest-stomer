<script lang="tsx">
import { defineComponent, computed, Fragment, type PropType, type CSSProperties, type VNodeChild } from 'vue'

export default defineComponent({
    name: 'CommonSource',
    props: {
        loading: { type: Boolean, default: true },
        size: { type: Number, default: 10 },
        page: { type: Number, default: 1 },
        total: { type: Number, default: 0 },
        dataSource: { type: Array as PropType<Array<Record<string, unknown>>>, default: () => [] },
        dataRender: { type: Function as PropType<(e: Record<string, unknown>) => VNodeChild> },
        cols: { type: Number, default: 3 },
        xGap: { type: Number, default: 16 },
        yGap: { type: Number, default: 16 }
    },
    setup(props, { slots }) {
        const cameStyle = computed<CSSProperties>(() => ({
            rowGap: props.xGap + 'px',
            columnGap: props.yGap + 'px',
            gridTemplateColumns: `repeat(${props.cols}, minmax(0px, 1fr))`
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
                                <n-pagination
                                    page={props.page}
                                    page-size={props.size}
                                    page-count={props.total}
                                    page-sizes={[10, 20, 30, 40, 50]}
                                    show-size-picker
                                    display-order={['pages', 'size-picker']}
                                    on-update:page={(e: number) => console.log(e)}
                                    on-update:page-size={(e: number) => console.log(e)}
                                />
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
        position: relative;
        display: grid;
        padding: 16px 16px 32px;
    }
    &__pagination {
        display: flex;
        justify-content: center;
        padding: 0 16px 48px;
    }
}
</style>
