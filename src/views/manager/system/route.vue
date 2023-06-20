<script lang="tsx">
import { defineComponent, Fragment } from 'vue'
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
                    width={375}
                    device={store.device}
                    loading={state.loading}
                    total={state.total}
                    data-column={state.dataColumn}
                    data-source={state.dataSource}
                >
                    {{
                        column: (scope: IRoute & { visible: boolean; done: Function }) => (
                            <Fragment>
                                <section style={{ padding: '0 16px 16px' }}>
                                    <n-grid cols={4} x-gap={14} y-gap={14} item-responsive style={{ padding: '0' }}>
                                        <n-grid-item span="1:4 520:2 840:2 841:1">
                                            <common-reactive y-gap={3} label="节点类型">
                                                <n-tag bordered={false} size="small" type="success">
                                                    已启用
                                                </n-tag>
                                            </common-reactive>
                                        </n-grid-item>
                                        <n-grid-item span="1:4 520:2 840:2 841:1">
                                            <common-reactive y-gap={3} label="页面路径" content={scope.path}></common-reactive>
                                        </n-grid-item>
                                        <n-grid-item span="1:4 520:2 840:2 841:1">
                                            <common-reactive y-gap={3} label="重定向地址" content={scope.redirect}></common-reactive>
                                        </n-grid-item>
                                        <n-grid-item span="1:4 520:2 840:2 841:1">
                                            <common-reactive y-gap={3} label="状态">
                                                <common-mode value={scope.status}></common-mode>
                                            </common-reactive>
                                        </n-grid-item>
                                    </n-grid>
                                </section>
                                <common-collapse visible={scope.visible}>
                                    <common-recursion data-source={scope.children}>
                                        {{
                                            default: (recur: IRoute & { visible: boolean; done: Function }) => (
                                                <Fragment>
                                                    <common-source-column
                                                        bordered={false}
                                                        collapse={recur.children.length > 0}
                                                        node={recur}
                                                    >
                                                        <section style={{ padding: '0 16px 16px' }}>
                                                            <n-grid cols={4} x-gap={14} y-gap={14} item-responsive style={{ padding: '0' }}>
                                                                <n-grid-item span="1:4 520:2 840:2 841:1">
                                                                    <common-reactive y-gap={3} label="节点类型">
                                                                        <n-tag bordered={false} size="small" type="success">
                                                                            已启用
                                                                        </n-tag>
                                                                    </common-reactive>
                                                                </n-grid-item>
                                                                <n-grid-item span="1:4 520:2 840:2 841:1">
                                                                    <common-reactive
                                                                        y-gap={3}
                                                                        label="页面路径"
                                                                        content={recur.path}
                                                                    ></common-reactive>
                                                                </n-grid-item>
                                                                <n-grid-item span="1:4 520:2 840:2 841:1">
                                                                    <common-reactive
                                                                        y-gap={3}
                                                                        label="重定向地址"
                                                                        content={recur.redirect}
                                                                    ></common-reactive>
                                                                </n-grid-item>
                                                                <n-grid-item span="1:4 520:2 840:2 841:1">
                                                                    <common-reactive y-gap={3} label="状态">
                                                                        <common-mode value={recur.status}></common-mode>
                                                                    </common-reactive>
                                                                </n-grid-item>
                                                            </n-grid>
                                                        </section>
                                                    </common-source-column>
                                                    <n-divider style={{ width: 'calc(100% - 32px)', margin: '0 16px' }} />
                                                </Fragment>
                                            )
                                        }}
                                    </common-recursion>
                                </common-collapse>
                            </Fragment>
                        )
                    }}
                </common-source>
            </common-container>
        )
    }
})
</script>
