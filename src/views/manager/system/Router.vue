<script lang="tsx">
import { defineComponent, computed } from 'vue'
import { useProvider } from '@/hooks/hook-provider'
import { useColumn } from '@/hooks/hook-column'
import { useSource } from '@/hooks/hook-source'
import { httpColumn, IRouter } from '@/api/fetch-router'
import { formaterTree } from '@/utils/utils-route'

export default defineComponent({
    name: 'MRouter',
    setup() {
        const { vars } = useProvider()
        const {} = useColumn()
        const { state, setState, fetchUpdate } = useSource<IRouter, Object>({
            dataColumn: [
                { title: '名称', key: 'title', minWidth: 120 },
                { title: '图标', key: 'icon', minWidth: 120 }
            ],
            immediate: true,
            init: e => httpColumn()
        })
        const dataSource = computed(() => formaterTree(state.dataSource))

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
                    // render-cell={render}
                    pagination={{
                        page: state.page,
                        pageSize: state.size,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageCount: state.total,
                        showSizePicker: true,
                        showQuickJumper: true,
                        onUpdatePage: (value: number) => fetchUpdate({ page: value }),
                        onUpdatePageSize: (value: number) => fetchUpdate({ page: 1, size: value })
                    }}
                ></n-data-table>
            </u-container>
        )
    }
})
</script>
