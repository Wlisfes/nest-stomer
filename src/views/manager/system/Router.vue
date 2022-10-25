<script lang="tsx">
import type { DataTableBaseColumn } from 'naive-ui'
import { defineComponent } from 'vue'
import { ICommon } from '@/interface/fetch-core'

export default defineComponent({
    name: 'MRouter',
    setup() {
        const dataColumn: Array<DataTableBaseColumn> = []
        return () => (
            <u-container style={{ margin: '0 10px 10px' }}>
                <n-data-table
                    class="naive-customize"
                    size="small"
                    style={{ flex: 1 }}
                    scroll-x={1080}
                    bordered={false}
                    flex-height={true}
                    // loading={state.loading}
                    row-key={(row: ICommon) => row.id}
                    columns={dataColumn}
                    // data={state.dataSource}
                    // render-cell={render}
                    // pagination={{
                    //     page: state.page,
                    //     pageSize: state.size,
                    //     pageSizes: [10, 20, 30, 40, 50],
                    //     pageCount: state.total,
                    //     showSizePicker: true,
                    //     showQuickJumper: true,
                    //     onUpdatePage: (value: number) => fetchUpdate({ page: value }),
                    //     onUpdatePageSize: (value: number) => fetchUpdate({ page: 1, size: value })
                    // }}
                ></n-data-table>
            </u-container>
        )
    }
})
</script>
