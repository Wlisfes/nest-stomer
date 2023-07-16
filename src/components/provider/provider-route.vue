<script lang="tsx">
import { defineComponent, computed, Fragment, type PropType } from 'vue'
import { useState } from '@/hooks/hook-state'
import { useCurrent } from '@/locale/instance'
import { divineDelay, divineParameter } from '@/utils/utils-common'
import { createRequest } from '@/utils/utils-request'
import { sompute } from '@/utils/utils-remix'
import { createDiscover, createNotice } from '@/utils/utils-naive'
import { createElement } from '@/utils/utils-instance'
import { fetchRule, fetchRoute } from '@/views/manager/hooks/fetch-instance'
import { httpRouteTransfer, httpRuleTransfer, type IRoute, type IRule } from '@/api/http-route'

export default defineComponent({
    name: 'ProviderRoute',
    props: {
        node: {
            type: Object as PropType<IRoute>,
            required: true
        },
        bordered: {
            type: Boolean,
            default: true
        }
    },
    emits: ['update'],
    setup(props, { emit }) {
        const { t } = useCurrent()
        const { state, setState } = useState({
            visible: false,
            collapse: props.node.children.length > 0
        })

        /**切换收缩状态**/
        async function onCollapse() {
            return await setState({ visible: !state.visible })
        }

        /**新增规则**/
        async function onCreateRule(app: { done: Function }) {
            return fetchRule({
                title: t('common.create.enter', { name: t('rule.common.name') }),
                command: 'CREATE',
                route: props.node.id
            }).then(({ observer }) => {
                observer.on('submit', ({ done }) => {
                    done({ visible: false }).finally(() => emit('update'))
                })
            })
        }

        /**编辑规则**/
        async function onUpdateRule(key: string, data: IRule, app: { done: Function }) {
            return fetchRule({
                title: t('common.update.enter', { name: t('rule.common.name') }),
                command: 'UPDATE',
                id: data.id
            }).then(({ observer }) => {
                observer.on('submit', ({ done }) => {
                    done({ visible: false }).finally(() => emit('update'))
                })
            })
        }

        /**启用、禁用规则**/
        async function onRuleTransfer(key: string, data: IRule, app: { done: Function }) {
            return await createRequest({
                execute: async e => {
                    await app.done(true)
                    await httpRuleTransfer({ id: data.id, status: key as IRule['status'] })
                    await divineDelay(300)
                    return await createNotice({
                        title: t(`common.${key}.enter` as Parameters<typeof t>['0']),
                        onAfterEnter: () => emit('update')
                    })
                },
                catch: async e => await createNotice({ type: 'error', title: e.message }),
                finally: e => app.done(false)
            })
        }

        /**删除规则**/
        async function onDeleteRule(key: string, data: IRule, app: { done: Function }) {
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
                            await httpRuleTransfer({ id: data.id, status: 'delete' })
                            await divineDelay(300)
                            return await createNotice({
                                title: t('common.delete.notice'),
                                onAfterEnter: () => emit('update')
                            })
                        },
                        catch: async e => await createNotice({ type: 'error', title: e.message }),
                        finally: async e => await done(false)
                    })
                }
            })
        }

        /**新增路由**/
        async function onCreateRoute() {
            return fetchRoute({
                command: 'CREATE',
                parent: props.node.id,
                title: t('common.create.enter', { name: t('route.common.name') })
            }).then(({ observer }) => {
                observer.on('submit', ({ done }) => {
                    done({ visible: false }).finally(() => emit('update'))
                })
            })
        }

        /**编辑路由**/
        async function onUpdateRoute() {
            return fetchRoute({
                command: 'UPDATE',
                id: props.node.id,
                title: t('common.create.enter', { name: t('route.common.name') })
            }).then(({ observer }) => {
                observer.on('submit', ({ done }) => {
                    done({ visible: false }).finally(() => emit('update'))
                })
            })
        }

        /**启用、禁用路由**/
        async function onRouteTransfer(key: string, app: { done: Function }) {
            return await createRequest({
                execute: async e => {
                    await app.done(true)
                    await httpRouteTransfer({ id: props.node.id, status: key as IRule['status'] })
                    await divineDelay(300)
                    return await createNotice({
                        title: t(`common.${key}.enter` as Parameters<typeof t>['0']),
                        onAfterEnter: () => emit('update')
                    })
                },
                catch: async e => await createNotice({ type: 'error', title: e.message }),
                finally: e => app.done(false)
            })
        }

        /**删除路由**/
        async function onDeleteRoute(key: string, app: { done: Function }) {
            const { element } = await createElement(<n-text type="error" v-slots={{ default: () => props.node.title }} />, {
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
                            await httpRouteTransfer({ id: props.node.id, status: 'disable' })
                            await divineDelay(300)
                            return await createNotice({ title: t('common.delete.notice'), onAfterEnter: () => emit('update') })
                        },
                        catch: async e => await createNotice({ type: 'error', title: e.message }),
                        finally: e => done(false)
                    })
                }
            })
        }

        return () => (
            <n-el tag="div" class={{ 'provider-route': true, 'is-bordered': props.bordered }}>
                <div
                    class={{ 'route-header not-selecter': true, 'n-pointer': state.collapse }}
                    onClick={() => state.collapse && onCollapse()}
                >
                    <div class="route-header__content n-basic">
                        {props.node.icon && <n-icon size={28} style={{ marginRight: '10px' }} component={<Icon-HomeOutlined />}></n-icon>}
                        <n-h3 style={{ flex: 1, margin: 0 }}>
                            <n-ellipsis tooltip={false}>{props.node.title}</n-ellipsis>
                        </n-h3>
                    </div>
                    <n-space align="center" justify="center" wrap-item={false} size={5} style={{ margin: '0 10px 0' }}>
                        {props.node.type === 'directory' ? (
                            <common-remix stop size={18} type="primary" icon={sompute('AddBold')} onTrigger={onCreateRoute} />
                        ) : (
                            <common-remix stop size={18} type="success" icon={sompute('SlackBold')} onTrigger={onCreateRule} />
                        )}
                        <common-dropdown
                            command={[
                                { key: 'update', visible: true },
                                { key: 'delete', visible: true },
                                { key: 'disable', visible: props.node.status === 'enable' },
                                { key: 'enable', visible: props.node.status === 'disable' }
                            ].reduce((and: string[], next) => (next.visible ? and.concat(next.key) : and), [])}
                            onUpdate={onUpdateRoute}
                            onDisable={onRouteTransfer}
                            onEnable={onRouteTransfer}
                            onDelete={onDeleteRoute}
                        >
                            <common-remix stop size={18} icon={sompute('RadixMore')}></common-remix>
                        </common-dropdown>
                        {state.collapse && (
                            <common-remix
                                hover={false}
                                size={18}
                                icon={sompute('ArrowRightBold', {
                                    style: {
                                        transition: 'transform 0.3s var(--cubic-bezier-ease-in-out)',
                                        color: 'var(--text-color-2)',
                                        transform: state.visible ? 'rotateZ(90deg)' : 'rotateZ(0deg)'
                                    }
                                })}
                            ></common-remix>
                        )}
                    </n-space>
                </div>
                <div class="route-context">
                    <div class="route-context__bacic">
                        <n-grid cols={4} x-gap={14} y-gap={14} item-responsive style={{ padding: '0' }}>
                            <n-grid-item span="1:4 520:2 840:2 960:1">
                                <common-reactive y-gap={3} label="节点类型">
                                    <n-tag bordered={false} size="small" type="success">
                                        已启用
                                    </n-tag>
                                </common-reactive>
                            </n-grid-item>
                            <n-grid-item span="1:4 520:2 840:2 960:1">
                                <common-reactive y-gap={3} label="页面路径" content={props.node.path}></common-reactive>
                            </n-grid-item>
                            <n-grid-item span="1:4 520:2 840:2 960:1">
                                <common-reactive y-gap={3} label="重定向地址" content={props.node.redirect}></common-reactive>
                            </n-grid-item>
                            <n-grid-item span="1:4 520:2 840:2 960:1">
                                <common-reactive y-gap={3} label="状态">
                                    <common-mode value={props.node.status}></common-mode>
                                </common-reactive>
                            </n-grid-item>
                        </n-grid>
                        {props.node.rule.length > 0 && (
                            <n-grid cols={2} x-gap={14} y-gap={14} item-responsive style={{ padding: '0', marginTop: '20px' }}>
                                {props.node.rule.map(item => (
                                    <n-grid-item span="1:2 520:2 960:1">
                                        <common-rule
                                            key={item.id}
                                            node={item}
                                            onUpdate={onUpdateRule}
                                            onDisable={onRuleTransfer}
                                            onEnable={onRuleTransfer}
                                            onDelete={onDeleteRule}
                                        ></common-rule>
                                    </n-grid-item>
                                ))}
                            </n-grid>
                        )}
                    </div>
                    <common-collapse visible={state.visible}>
                        <common-recursion
                            data-source={props.node.children}
                            v-slots={{
                                default: (scope: IRoute) => (
                                    <Fragment>
                                        <n-divider style={{ margin: '0 16px', width: 'calc(100% - 32px)' }} />
                                        <provider-route
                                            bordered={false}
                                            node={scope}
                                            collapse={scope.children.length > 0}
                                            onUpdate={() => emit('update')}
                                        ></provider-route>
                                    </Fragment>
                                )
                            }}
                        ></common-recursion>
                    </common-collapse>
                </div>
            </n-el>
        )
    }
})
</script>

<style lang="scss" scoped>
.provider-route {
    position: relative;
    border-radius: var(--border-radius);
    box-sizing: border-box;
    background-color: var(--card-color);
    word-break: break-word;
    transition: color 0.3s var(--n-bezier), background-color 0.3s var(--n-bezier), border-color 0.3s var(--n-bezier);
    &.is-bordered {
        border: 1px solid var(--divider-color);
    }

    .route-header {
        display: flex;
        padding: 12px 0 12px 14px;
        color: var(--text-color-1);
        &__content {
            flex: 1;
            overflow: hidden;
            line-height: var(--height-small);
        }
    }

    .route-context {
        color: var(--text-color-2);
        font-size: var(--font-size);
        line-height: var(--height-tiny);
        &__bacic {
            padding: 0 14px 14px;
        }
    }
}
</style>
