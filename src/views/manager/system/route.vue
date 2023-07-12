<script lang="tsx">
import { defineComponent, Fragment, type SetupContext } from 'vue'
import { httpColumnRoute, httpRouteTransfer, httpRuleTransfer, type IRoute, type IRule } from '@/api/http-route'
import { useCurrent } from '@/locale/instance'
import { useSource } from '@/hooks/hook-source'
import { divineDelay, divineParameter } from '@/utils/utils-common'
import { createRequest } from '@/utils/utils-request'
import { sompute, type INameUI } from '@/utils/utils-remix'
import { createDiscover, createNotice } from '@/utils/utils-naive'
import { createElement } from '@/utils/utils-instance'
import { fetchRule, fetchRoute } from '@/views/manager/hooks/fetch-instance'

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

        /**选中规则回调**/
        async function onRuleSelecter(key: string, option: IRule, app: { done: Function }) {
            if (key === 'update') {
                /**编辑规则**/
                return fetchRule({
                    title: t('common.update.enter', { name: t('rule.common.name') }),
                    command: 'UPDATE',
                    id: option.id
                }).then(({ observer }) => {
                    observer.on('submit', async ({ done }) => {
                        await done({ visible: false })
                        await fetchUpdate()
                    })
                })
            }

            if (['disable', 'enable'].includes(key)) {
                /**启用、禁用规则**/
                return await createRequest({
                    execute: async e => {
                        await app.done(true)
                        await httpRuleTransfer({ id: option.id, status: key as IRule['status'] })
                        await divineDelay(300)
                        return await createNotice({
                            title: t(`common.${key}.enter` as Parameters<typeof t>['0']),
                            onAfterEnter: fetchUpdate
                        })
                    },
                    catch: async e => await createNotice({ type: 'error', title: e.message }),
                    finally: e => app.done(false)
                })
            }

            if (key === 'delete') {
                /**删除规则**/
                const { element } = await createElement(<n-text type="error" v-slots={{ default: () => t('rule.common.name') }} />, {
                    style: { padding: '0 5px', fontWeight: 600 }
                })
                return await createDiscover({
                    type: 'error',
                    title: t('common.hint.value'),
                    content: () => <n-h3 v-html={t('common.delete.hint', { name: element })}></n-h3>,
                    negativeText: t('common.cancel.value'),
                    positiveText: t('common.confirm.value'),
                    onPositiveClick: async (evt, vm, done: Function) => {
                        return await createRequest<boolean>({
                            execute: async e => {
                                await done(true)
                                await httpRuleTransfer({ id: option.id, status: 'delete' })
                                await divineDelay(300)
                                return await createNotice({ title: t('common.delete.notice'), onAfterEnter: fetchUpdate })
                            },
                            catch: async e => await createNotice({ type: 'error', title: e.message }),
                            finally: async e => await done(false)
                        })
                    }
                })
            }
        }

        /**选中路由回调**/
        async function onRouteSelecter(key: string, option: IRoute, app: { done: Function }) {
            if (key === 'create-rule') {
                /**新增规则**/
                return fetchRule({
                    title: t('common.create.enter', { name: t('rule.common.name') }),
                    command: 'CREATE',
                    route: option.id
                }).then(({ observer }) => {
                    observer.on('submit', async ({ done }) => {
                        await done({ visible: false })
                        await fetchUpdate()
                    })
                })
            }

            if (['create-route', 'update'].includes(key)) {
                /**新增、编辑路由**/
                const parameter = await divineParameter({ id: option.id }).then(data => {
                    if (key === 'create-route') {
                        return {
                            ...data,
                            command: 'CREATE',
                            parent: option.id,
                            title: t('common.create.enter', { name: t('route.common.name') })
                        }
                    }
                    return {
                        ...data,
                        command: 'UPDATE',
                        parent: option.parent,
                        title: t('common.update.enter', { name: t('route.common.name') })
                    }
                })
                return fetchRoute(parameter).then(({ observer }) => {
                    observer.on('submit', async ({ done }) => {
                        await done({ visible: false })
                        await fetchUpdate()
                    })
                })
            }

            if (['disable', 'enable'].includes(key)) {
                /**启用、禁用路由**/
                return await createRequest({
                    execute: async e => {
                        await app.done(true)
                        await httpRouteTransfer({ id: option.id, status: key as IRule['status'] })
                        await divineDelay(300)
                        return await createNotice({
                            title: t(`common.${key}.enter` as Parameters<typeof t>['0']),
                            onAfterEnter: fetchUpdate
                        })
                    },
                    catch: async e => await createNotice({ type: 'error', title: e.message }),
                    finally: e => app.done(false)
                })
            }

            if (key === 'delete') {
                /**删除路由**/
                const { element } = await createElement(<n-text type="error" v-slots={{ default: () => option.title }} />, {
                    style: { padding: '0 5px', fontWeight: 600 }
                })
                return await createDiscover({
                    type: 'error',
                    title: t('common.hint.value'),
                    content: () => <n-h3 v-html={t('common.delete.hint', { name: element })}></n-h3>,
                    negativeText: t('common.cancel.value'),
                    positiveText: t('common.confirm.value'),
                    onPositiveClick: (evt, vm, done: Function) => {
                        return createRequest<boolean>({
                            execute: async () => {
                                await done(true)
                                await httpRouteTransfer({ id: option.id, status: 'disable' })
                                await divineDelay(300)
                                return await createNotice({ title: t('common.delete.notice'), onAfterEnter: fetchUpdate })
                            },
                            catch: async e => await createNotice({ type: 'error', title: e.message }),
                            finally: e => done(false)
                        })
                    }
                })
            }
        }

        /**路由列插槽**/
        const RouteColumnUI = (data: IRoute) => (
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

        /**操作栏插槽**/
        const RouteSuffixUI = (data: IRoute) => {
            return (
                <Fragment>
                    {[
                        { command: 'create-route', type: 'primary', icon: 'AddBold', visible: data.type === 'directory' },
                        { command: 'create-rule', type: 'success', icon: 'SlackBold', visible: data.type === 'menu' }
                    ].map(item => {
                        return item.visible ? (
                            <common-remix
                                stop
                                size={18}
                                type={item.type}
                                icon={sompute(item.icon as INameUI)}
                                onTrigger={(app: never) => onRouteSelecter(item.command, data, app)}
                            />
                        ) : null
                    })}
                    <common-dropdown
                        command={[
                            { key: 'update', visible: true },
                            { key: 'delete', visible: true },
                            { key: 'disable', visible: data.status === 'enable' },
                            { key: 'enable', visible: data.status === 'disable' }
                        ].reduce((and: string[], next) => (next.visible ? and.concat(next.key) : and), [])}
                        onSelecter={(key: string, app: never) => onRouteSelecter(key, data, app)}
                    >
                        <common-remix stop size={18} icon={sompute('RadixMore')}></common-remix>
                    </common-dropdown>
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
                    data-render={(data: IRoute) => (
                        <common-source-column
                            key={data.id}
                            node={data}
                            collapse={data.children.length > 0}
                            v-slots={{ suffix: RouteSuffixUI }}
                            data-render={(model: { visible: boolean }) => (
                                <Fragment>
                                    <section style={{ padding: '0 16px 16px' }}>
                                        <RouteColumnUI {...data} />
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
                                                            v-slots={{ suffix: RouteSuffixUI }}
                                                            data-render={(e: { visible: boolean }) => (
                                                                <Fragment>
                                                                    <section style={{ padding: '0 16px 16px' }}>
                                                                        <RouteColumnUI {...scope} />
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
