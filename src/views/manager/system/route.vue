<script lang="tsx">
import { defineComponent } from 'vue'
import { httpColumnRoute, type IRoute } from '@/api/http-route'
import { useSource } from '@/hooks/hook-source'
import { useManager } from '@/store/manager'

export default defineComponent({
    name: 'Route',
    setup() {
        const store = useManager()
        const { state } = useSource<IRoute, Record<string, unknown>>({
            immediate: true,
            dataColumn: [
                { key: 'title', title: '节点名称', minWidth: 150 },
                { key: 'icon', title: '节点图标', minWidth: 120 },
                { key: 'type', title: '节点类型', minWidth: 150 },
                { key: 'path', title: '页面路径', minWidth: 255 },
                { key: 'redirect', title: '重定向地址', minWidth: 255 },
                { key: 'status', title: '状态', minWidth: 150 }
            ],
            request: () => httpColumnRoute()
        })

        return () => (
            <common-container>
                <common-source
                    device={store.device}
                    loading={state.loading}
                    total={state.total}
                    data-column={state.dataColumn}
                    data-source={state.dataSource}
                >
                    {{
                        column: (scope: IRoute & { done: Function }) => {
                            console.log(scope)
                            return <div>1111111111111</div>
                        },
                        default: (e: IRoute) => (
                            <common-table width={1080}>
                                {state.dataColumn.map(x => (
                                    <common-table-column
                                        key={x.key}
                                        width={1080}
                                        minWidth={x.minWidth}
                                        title={e[x.key as keyof IRoute]}
                                    ></common-table-column>
                                ))}
                            </common-table>
                        )
                    }}
                </common-source>
            </common-container>
        )
    }
})
</script>
