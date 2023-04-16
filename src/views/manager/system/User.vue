<script lang="tsx">
import { defineComponent, VNode } from 'vue'
import { DataTableBaseColumn } from 'naive-ui'
import { useProvider } from '@/hooks/hook-provider'
import { useColumn } from '@/hooks/hook-column'
import { useSource } from '@/hooks/hook-source'
import { httpColumn, IRoute } from '@/api/fetch-route'

export default defineComponent({
    name: 'User',
    setup() {
        const { vars } = useProvider()
        const { divineColumn, divineRxicon, divineCmule, divineCommand } = useColumn()
        const { state, setState, fetchUpdate } = useSource<IRoute, Record<string, unknown>>({
            props: {
                density: 'small'
            },
            dataColumn: [
                { title: '名称', key: 'title', minWidth: 200 },
                { title: '图标', key: 'icon', width: 120 },
                { title: '类型', key: 'type', width: 120 },
                { title: '节点路由', key: 'path', minWidth: 200, ellipsis: { tooltip: true } },
                { title: '更新时间', key: 'updateTime', align: 'center', width: 180 },
                { title: '操作', key: 'command', fixed: 'right', align: 'center', width: 160 }
            ],
            immediate: true,
            init: httpColumn
        })

        // const render = (value: unknown, row: IRouter, base: DataTableBaseColumn) => {
        //     const __COLUME__ = {
        //         icon: () => divineColumn(value, divineRxicon(row.icon, { depth: 1 }, { cursor: 'pointer' })),
        //         type: () => {
        //             if (value === 1) {
        //                 return divineCmule('目录', { type: 'info', bordered: false }, { class: 'n-customize' })
        //             } else if (value === 2) {
        //                 return divineCmule('目录', { type: 'success', bordered: false }, { class: 'n-customize' })
        //             }
        //         },
        //         command: () => {
        //             return divineCommand(row, { native: ['edit'] })
        //         }
        //     }

        //     return __COLUME__[base.key as keyof typeof __COLUME__]?.() ?? divineColumn(value)
        // }

        const basicRender: Record<string, (value: unknown, row: IRoute, base: DataTableBaseColumn) => VNode> = {
            icon: (value, row) => {
                return divineColumn(value, divineRxicon(row.icon, { depth: 1 }, { cursor: 'pointer' }))
            }
            // command: (value, row) => {
            //     return divineCommand(row, { native: ['edit'] })
            // }
        }

        return () => (
            <u-container space="16px" style={{ margin: '0 10px 10px', backgroundColor: vars.value.cardColor }}>
                <basic-table
                    density={state.density}
                    data-column={state.dataColumn}
                    data-source={state.dataSource}
                    loading={state.loading}
                    basic-render={basicRender}
                    set-state={setState}
                    onReload={fetchUpdate}
                ></basic-table>
            </u-container>
        )
    }
})
</script>
