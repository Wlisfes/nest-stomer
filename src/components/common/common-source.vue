<script lang="tsx">
import { defineComponent, Fragment, type PropType } from 'vue'
import { type DataTableBaseColumn } from 'naive-ui'

export default defineComponent({
    name: 'CommonSource',
    props: {
        dataColumn: {
            type: Array as PropType<Array<DataTableBaseColumn>>,
            default: () => []
        },
        dataSource: {
            type: Array as PropType<Array<Record<string, unknown>>>,
            default: () => []
        },
        total: {
            type: Number,
            default: 0
        },
        loading: {
            type: Boolean,
            default: true
        }
    },
    setup(props, { slots }) {
        console.log(slots)
        return () => (
            <section class="common-source">
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
                            {props.dataColumn.length > 0 && (
                                <common-table>
                                    {props.dataColumn.map(x => (
                                        <common-table-column key={x.key} title={x.title}></common-table-column>
                                    ))}
                                </common-table>
                            )}
                            {props.dataSource.map(x => slots.default?.(x))}
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
    padding: 0 8px;
}
</style>
