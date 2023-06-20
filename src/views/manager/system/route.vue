<script lang="tsx">
import { defineComponent, Fragment } from 'vue'
import { httpColumnRoute, type IRoute } from '@/api/http-route'
import { useSource } from '@/hooks/hook-source'
import { useManager } from '@/store/manager'
interface IRecur extends IRoute {
    index: number
    visible: boolean
    done: Function
}

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

        const RouteColumn = (data: IRecur) => {
            return (
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
                        <common-reactive y-gap={3} label="重定向地址" content={data.redirect}></common-reactive>
                    </n-grid-item>
                    <n-grid-item span="1:4 520:2 840:2 841:1">
                        <common-reactive y-gap={3} label="状态">
                            <common-mode value={data.status}></common-mode>
                        </common-reactive>
                    </n-grid-item>
                </n-grid>
            )
        }

        const RouteRecursion = (data: IRecur) => {
            return (
                <common-recursion
                    space={16}
                    data-source={data.children}
                    v-slots={{
                        default: (recur: IRecur) => (
                            <Fragment>
                                <div style={{ margin: '0 16px', overflow: 'hidden' }}>
                                    <n-divider style={{ margin: 0 }} />
                                </div>
                                <common-source-column bordered={false} collapse={recur.children.length > 0} node={recur}>
                                    {{
                                        default: (e: Pick<IRecur, 'visible' | 'done'>) => {
                                            return (
                                                <Fragment>
                                                    <section style={{ padding: '0 16px 16px' }}>
                                                        <RouteColumn {...recur}></RouteColumn>
                                                    </section>
                                                    <common-collapse visible={e.visible}>
                                                        <RouteRecursion {...recur}></RouteRecursion>
                                                    </common-collapse>
                                                </Fragment>
                                            )
                                        }
                                    }}
                                </common-source-column>
                            </Fragment>
                        )
                    }}
                ></common-recursion>
            )
        }

        return () => (
            <common-container>
                <common-source
                    width={375}
                    device={store.device}
                    loading={state.loading}
                    total={state.total}
                    data-column={state.dataColumn}
                    data-source={state.dataSource}
                    v-slots={{
                        default: (data: IRecur) => (
                            <common-source-column key={data.id} node={data} collapse={data.children.length > 0}>
                                {{
                                    default: (scope: IRecur) => (
                                        <Fragment>
                                            <section style={{ padding: '0 16px 16px' }}>
                                                <RouteColumn {...data}></RouteColumn>
                                            </section>
                                            <common-collapse visible={scope.visible}>
                                                <RouteRecursion {...data}></RouteRecursion>
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
