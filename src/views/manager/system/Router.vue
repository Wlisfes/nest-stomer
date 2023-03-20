<script lang="tsx">
import { defineComponent } from 'vue'
import { DataTableBaseColumn } from 'naive-ui'
import { useProvider } from '@/hooks/hook-provider'
import { useColumn } from '@/hooks/hook-column'
import { useSource } from '@/hooks/hook-source'
import { httpColumn, IRouter } from '@/api/fetch-router'

export default defineComponent({
    name: 'MRouter',
    setup() {
        const { vars } = useProvider()
        const { divineColumn, divineRxicon, divineCmule, divineCommand } = useColumn()
        const { state, setState, fetchUpdate } = useSource<IRouter, Object>({
            dataColumn: [
                { title: '名称', key: 'title', minWidth: 200 },
                { title: '图标', key: 'icon', width: 120 },
                { title: '类型', key: 'type', width: 120 },
                { title: '节点路由', key: 'path', minWidth: 200, ellipsis: { tooltip: true } },
                { title: '更新时间', key: 'updateTime', align: 'center', width: 180 },
                { title: '操作', key: 'command', fixed: 'right', align: 'center', width: 160 }
            ],
            immediate: true,
            init: e => httpColumn()
        })

        const render = (value: unknown, row: IRouter, base: DataTableBaseColumn) => {
            const __COLUME__ = {
                icon: () => divineColumn(value, divineRxicon(row.icon, { depth: 1 }, { cursor: 'pointer' })),
                type: () => {
                    if (value === 1) {
                        return divineCmule('目录', { type: 'info', bordered: false }, { class: 'naive-customize' })
                    } else if (value === 2) {
                        return divineCmule('目录', { type: 'success', bordered: false }, { class: 'naive-customize' })
                    }
                },
                command: () => {
                    return divineCommand(row, { native: ['edit'] })
                }
            }

            return __COLUME__[base.key as keyof typeof __COLUME__]?.() ?? divineColumn(value)
        }

        return () => (
            <u-container space="10px" style={{ margin: '0 10px 10px', backgroundColor: vars.value.cardColor }}>
                <n-data-table
                    class="naive-customize"
                    size="small"
                    style={{ flex: 1 }}
                    scroll-x={1080}
                    bordered={false}
                    flex-height={true}
                    loading={state.loading}
                    row-key={(row: IRouter) => row.id}
                    columns={state.dataColumn}
                    data={state.dataSource}
                    render-cell={render}
                ></n-data-table>
            </u-container>
        )
    }
})
</script>
