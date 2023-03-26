<script lang="tsx">
import { defineComponent, type PropType } from 'vue'
import { type DataTableBaseColumn } from 'naive-ui'
import { useRxicon } from '@/hooks/hook-icon'
import { useLocale } from '@/hooks/hook-locale'
import { useColumn } from '@/hooks/hook-column'

export default defineComponent({
    name: 'BasicTable',
    props: {
        loading: {
            type: Boolean,
            default: true
        },
        dataColumn: {
            type: Array as PropType<Array<DataTableBaseColumn>>,
            default: () => []
        },
        dataSource: {
            type: Array as PropType<Array<Record<string, unknown>>>,
            default: () => []
        },
        render: {
            type: Object as PropType<Record<string, Function>>
        },
        size: {
            type: String as PropType<'small' | 'medium' | 'large'>,
            default: 'medium'
        }
    },
    emits: ['reload'],
    setup(props, { slots, emit }) {
        const { t } = useLocale()
        const { Icon, compute } = useRxicon()
        const { divineColumn } = useColumn()

        //自定义单元格
        function nodeRender(value: unknown, row: Record<string, unknown>, base: DataTableBaseColumn) {
            if (props.render && typeof props.render[base.key] === 'function') {
                return props.render[base.key](value, row, base)
            }
            return divineColumn(value)
        }

        return () => {
            return (
                <u-container class="basic-table">
                    <basic-toolbar size={props.size} onReload={() => emit('reload')}>
                        {{
                            start: () => (
                                <n-button
                                    type="primary"
                                    render-icon={() => <Icon component={compute('PlusOutlined')}></Icon>}
                                    style={{ marginRight: 'auto' }}
                                >
                                    新建
                                </n-button>
                            )
                        }}
                    </basic-toolbar>
                    <n-data-table
                        class="naive-customize"
                        size="small"
                        style={{ flex: 1 }}
                        scroll-x={1080}
                        bordered={false}
                        flex-height={true}
                        loading={props.loading}
                        row-key={(row: any) => row.id}
                        columns={props.dataColumn}
                        data={props.dataSource}
                        render-cell={nodeRender}
                    ></n-data-table>
                </u-container>
            )
        }
    }
})
</script>

<style lang="scss" scoped>
.basic-table {
    position: relative;
}
</style>
q
