<script lang="tsx">
import { defineComponent, Fragment, type SetupContext, type VNode } from 'vue'
import { httpColumnRoute, type IRoute, type IRule } from '@/api/http-route'
import { useCurrent } from '@/locale/instance'
import { useSource } from '@/hooks/hook-source'
import { sompute } from '@/utils/utils-remix'
import { fetchRule } from '@/views/manager/hooks/fetch-instance'

export default defineComponent({
    name: 'Route',
    setup() {
        const { t } = useCurrent()
        const { state, fetchUpdate } = useSource<IRoute, Record<string, unknown>>({
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

        /**选中规则回调**/
        function onRuleSelecter(key: string, option: IRule) {
            if (key === 'update') {
                return fetchRule({
                    title: t('common.update.enter', { name: t('rule.common.name') }),
                    command: 'UPDATE',
                    node: option
                }).then(({ observer }) => {
                    observer.on('submit', async ({ done }) => {
                        await done({ visible: false })
                        await fetchUpdate()
                    })
                })
            }
        }

        const RouteColumn = (data: IRoute) => (
            <Fragment>
                <n-grid cols={4} x-gap={14} y-gap={14} item-responsive style={{ padding: '0' }}>
                    <n-grid-item span="1:4 520:2 840:2 960:1">
                        <common-reactive y-gap={3} label="节点类型">
                            <n-tag bordered={false} size="small" type="success">
                                已启用
                            </n-tag>
                        </common-reactive>
                    </n-grid-item>
                    <n-grid-item span="1:4 520:2 840:2 960:1">
                        <common-reactive y-gap={3} label="页面路径" content={data.path}></common-reactive>
                    </n-grid-item>
                    <n-grid-item span="1:4 520:2 840:2 960:1">
                        <common-reactive y-gap={3} label="重定向地址" content={data.redirect}></common-reactive>
                    </n-grid-item>
                    <n-grid-item span="1:4 520:2 840:2 960:1">
                        <common-reactive y-gap={3} label="状态">
                            <common-mode value={data.status}></common-mode>
                        </common-reactive>
                    </n-grid-item>
                </n-grid>
                {data.rule.length > 0 && (
                    <n-grid cols={2} x-gap={14} y-gap={14} item-responsive style={{ padding: '0', marginTop: '20px' }}>
                        {data.rule.map(item => (
                            <n-grid-item span="1:2 520:2 960:1">
                                <common-rule key={item.id} node={item} onSelecter={onRuleSelecter}></common-rule>
                            </n-grid-item>
                        ))}
                    </n-grid>
                )}
            </Fragment>
        )

        const RouteSuffix = (data: IRoute) => (
            <Fragment>
                <common-remix stop size={18} type="primary" icon={sompute('AddBold')}></common-remix>
                <common-remix stop size={18} type="primary" icon={sompute('SlackBold')}></common-remix>
                <common-remix stop size={18} type="info" icon={sompute('RadixEdit')}></common-remix>
                <common-remix stop size={18} type="error" icon={sompute('DeleteBold')}></common-remix>
            </Fragment>
        )

        return () => (
            <common-container>
                <common-source
                    width={375}
                    loading={state.loading}
                    total={state.total}
                    data-column={state.dataColumn}
                    data-source={state.dataSource}
                    data-render={(data: IRoute) => (
                        <common-source-column
                            key={data.id}
                            node={data}
                            collapse={data.children.length > 0}
                            v-slots={{ suffix: RouteSuffix }}
                            data-render={(model: { visible: boolean }) => (
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
                                                            v-slots={{ suffix: RouteSuffix }}
                                                            data-render={(e: { visible: boolean }) => (
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
                                                            )}
                                                        ></common-source-column>
                                                    </Fragment>
                                                )
                                            }}
                                        ></common-recursion>
                                    </common-collapse>
                                </Fragment>
                            )}
                        ></common-source-column>
                    )}
                ></common-source>
            </common-container>
        )
    }
})
</script>
