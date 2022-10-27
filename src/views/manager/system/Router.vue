<script lang="tsx">
import { defineComponent, h } from 'vue'
import { DataTableBaseColumn } from 'naive-ui'
import { useProvider } from '@/hooks/hook-provider'
import { useColumn } from '@/hooks/hook-column'
import { useSource } from '@/hooks/hook-source'
import { useRxicon, INode } from '@/hooks/hook-icon'
import { httpColumn, IRouter } from '@/api/fetch-router'
import { formaterTree } from '@/utils/utils-route'

export default defineComponent({
    name: 'MRouter',
    setup() {
        const { vars } = useProvider()
        const { Icon, compute } = useRxicon()
        const { calcColumn, divineColumn, divineRxicon } = useColumn()
        const { state, setState, fetchUpdate } = useSource<IRouter, Object>({
            dataColumn: [
                { title: '名称', key: 'title', width: calcColumn(100) },
                { title: '图标', key: 'icon', width: calcColumn(100, 1080) }
            ],
            immediate: true,
            init: () => {
                return httpColumn().then(response => {
                    return Object.assign(response, {
                        data: { list: formaterTree(response.data.list) }
                    })
                })
            }
        })

        const render = (value: unknown, row: IRouter, base: DataTableBaseColumn) => {
            const __COLUME__ = {
                icon: () => divineRxicon(row.icon)
            }

            return divineRxicon(row.icon) //divineColumn(value)
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
