<script lang="tsx">
import { defineComponent } from 'vue'
import { httpColumnRoute, type IRoute } from '@/api/http-route'
import { useCurrent } from '@/locale/instance'
import { useSource } from '@/hooks/hook-source'

export default defineComponent({
    name: 'Route',
    setup() {
        const { t } = useCurrent()
        const { state, fetchUpdate } = useSource<IRoute, Record<string, unknown>>({
            request: httpColumnRoute,
            immediate: true,
            dataColumn: [
                { key: 'title', title: '节点名称', minWidth: 150 },
                { key: 'icon', title: '节点图标', minWidth: 120 },
                { key: 'type', title: '节点类型', minWidth: 150 },
                { key: 'path', title: '页面路径', minWidth: 255 },
                { key: 'redirect', title: '重定向地址', minWidth: 255 },
                { key: 'status', title: '状态', minWidth: 150 }
            ]
        })

        return () => (
            <common-container>
                <common-source
                    width={375}
                    loading={state.loading}
                    total={state.total}
                    data-column={state.dataColumn}
                    data-source={state.dataSource}
                    data-render={(data: IRoute) => (
                        <provider-route node={data} collapse={data.children.length > 0} onUpdate={fetchUpdate}></provider-route>
                    )}
                ></common-source>
            </common-container>
        )
    }
})
</script>
