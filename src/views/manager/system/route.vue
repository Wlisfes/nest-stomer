<script lang="tsx">
import { defineComponent } from 'vue'
import { httpColumnRoute, type IRoute } from '@/api/http-route'
import { useSource } from '@/hooks/hook-source'

export default defineComponent({
    name: 'Route',
    setup() {
        const { state } = useSource<IRoute, Record<string, unknown>>({
            immediate: true,
            dataColumn: [
                { key: 'title', title: '节点名称' },
                { key: 'icon', title: '节点图标' },
                { key: 'type', title: '节点类型' },
                { key: 'path', title: '页面路径' },
                { key: 'redirect', title: '重定向地址' },
                { key: 'status', title: '状态' }
            ],
            request: () => httpColumnRoute()
        })

        return () => (
            <common-container>
                <common-source loading={state.loading} total={state.total} data-column={state.dataColumn} data-source={state.dataSource}>
                    {{
                        default: (e: IRoute) => {
                            return (
                                <common-table>
                                    <common-table-column title={e.title}></common-table-column>
                                    <common-table-column title={e.icon}></common-table-column>
                                    <common-table-column title={e.type}></common-table-column>
                                    <common-table-column title={e.path}></common-table-column>
                                    <common-table-column title={e.redirect}></common-table-column>
                                    <common-table-column title={e.status}></common-table-column>
                                </common-table>
                            )
                        }
                    }}
                </common-source>
            </common-container>
        )
    }
})
</script>
