<script lang="tsx">
import { defineComponent, Fragment, type SetupContext } from 'vue'
import { httpColumnRoute, type IRoute } from '@/api/http-route'
import { useSource } from '@/hooks/hook-source'

export default defineComponent({
    name: 'Route',
    setup() {
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

        const RouteColumn = (data: IRoute) => {
            return (
                <Fragment>
                    <n-grid cols={4} x-gap={14} y-gap={14} item-responsive style={{ padding: '0' }}>
                        <n-grid-item span="1:4 520:2 840:2 841:1">
                            <common-reactive y-gap={3} label="节点类型">
                                <n-tag bordered={false} size="small" type="success">
                                    已启用
                                </n-tag>
                            </common-reactive>
                        </n-grid-item>
                        <n-grid-item span="1:4 520:2 840:2 841:1">
                            <common-reactive y-gap={3} label="页面路径" content={data.path}></common-reactive>
                        </n-grid-item>
                        <n-grid-item span="1:4 520:2 840:2 841:1">
                            <common-reactive
                                y-gap={3}
                                label="重定向地址重定向地址重定向地址重定向地址重定向地址"
                                content={data.redirect}
                            ></common-reactive>
                        </n-grid-item>
                        <n-grid-item span="1:4 520:2 840:2 841:1">
                            <common-reactive y-gap={3} label="状态">
                                <common-mode value={data.status}></common-mode>
                            </common-reactive>
                        </n-grid-item>
                    </n-grid>
                    {data.rule.length > 0 && (
                        <n-grid cols={2} x-gap={14} y-gap={14} item-responsive style={{ padding: '0', marginTop: '20px' }}>
                            {data.rule.map(item => (
                                <n-grid-item span="1:2 520:2 960:1">
                                    <common-rule key={item.id} node={item}></common-rule>
                                </n-grid-item>
                            ))}
                        </n-grid>
                    )}
                </Fragment>
            )
        }

        return () => (
            <common-container>
                <common-source
                    width={375}
                    loading={state.loading}
                    total={state.total}
                    data-column={state.dataColumn}
                    data-source={state.dataSource}
                    v-slots={{
                        default: (data: IRoute) => (
                            <common-source-column key={data.id} node={data} collapse={data.children.length > 0}>
                                {{
                                    default: (model: { visible: boolean }) => (
                                        <Fragment>
                                            <section style={{ padding: '0 16px 16px' }}>
                                                <RouteColumn {...data}></RouteColumn>
                                            </section>
                                            <common-collapse visible={model.visible}>
                                                <common-recursion
                                                    data-source={data.children}
                                                    v-slots={{
                                                        default: (scope: IRoute, slots: SetupContext['slots']) => (
                                                            <Fragment>
                                                                <n-divider style={{ margin: '0 16px', width: 'calc(100% - 32px)' }} />
                                                                <common-source-column
                                                                    bordered={false}
                                                                    collapse={scope.children.length > 0}
                                                                    node={scope}
                                                                    v-slots={{
                                                                        default: (e: { visible: boolean }) => (
                                                                            <Fragment>
                                                                                <section style={{ padding: '0 16px 16px' }}>
                                                                                    <RouteColumn {...scope}></RouteColumn>
                                                                                </section>
                                                                                <common-collapse visible={e.visible}>
                                                                                    <common-recursion
                                                                                        data-source={scope.children}
                                                                                        v-slots={slots}
                                                                                    ></common-recursion>
                                                                                </common-collapse>
                                                                            </Fragment>
                                                                        )
                                                                    }}
                                                                ></common-source-column>
                                                            </Fragment>
                                                        )
                                                    }}
                                                ></common-recursion>
                                            </common-collapse>
                                        </Fragment>
                                    )
                                }}
                            </common-source-column>
                        )
                    }}
                ></common-source>
            </common-container>
        )
    }
})
</script>
