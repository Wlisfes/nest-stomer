<script lang="tsx">
import { defineComponent, VNode } from 'vue'
import { DataTableBaseColumn } from 'naive-ui'
import { useProvider } from '@/hooks/hook-provider'
import { useColumn } from '@/hooks/hook-column'
import { useSource } from '@/hooks/hook-source'
import { httpColumn, IRouter } from '@/api/fetch-router'
import { fetchRouter } from '@/views/manager/hooks/fetch-router'

export default defineComponent({
    name: 'MRouter',
    setup() {
        const { vars } = useProvider()
        const { divineColumn, divineRxicon, divineCmule, divineCommand } = useColumn()
        const { state, setState, fetchUpdate } = useSource<IRouter, Record<string, unknown>>({
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
            init: e => httpColumn()
        })

        const basicRender: Record<string, (value: unknown, row: IRouter, base: DataTableBaseColumn) => VNode> = {
            icon: (value, row) => {
                return divineColumn(value, divineRxicon(row.icon, { depth: 1 }, { cursor: 'pointer' }))
            },
            command: (value, row) => {
                return divineCommand(row, { native: ['edit'] })
            }
        }

        const fetchOneRouter = () => {
            fetchRouter()
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
