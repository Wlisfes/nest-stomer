<script lang="tsx">
import { defineComponent, Fragment, computed, toRefs, type PropType, type CSSProperties } from 'vue'
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
                        <Fragment>
                            {props.header && (
                                <div class="common-source__header" style={cameStyle.value}>
                                    {props.dataColumn.length > 0 && (
                                        <common-table width={props.width}>
                                            {props.dataColumn.map(x => (
                                                <common-table-column
                                                    key={x.key}
                                                    width={props.width}
                                                    minWidth={x.minWidth}
                                                    title={x.title}
                                                ></common-table-column>
                                            ))}
                                        </common-table>
                                    )}
                                </div>
                            )}
                            <div class="common-source__container" style={cameStyle.value}>
                                {props.dataSource.map(item => (
                                    <common-source-column key={item.id} node={item}>
                                        {{ default: (scope: Record<string, unknown>) => slots.column?.({ ...item, ...scope }) }}
                                    </common-source-column>
                                ))}
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
    padding: 0 16px;
    &.is-mobile {
        padding: 0;
        .common-source__header,
        .common-source__container {
            box-sizing: border-box;
            padding: 0 16px;
        }
    }
    &__container {
        position: relative;
        display: flex;
        flex-direction: column;
        row-gap: 12px;
        box-sizing: border-box;
    }
}
</style>
