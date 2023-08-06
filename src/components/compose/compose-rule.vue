<script lang="tsx">
import { defineComponent, type PropType } from 'vue'
import { useClipboard } from '@vueuse/core'
import { httpRuleTransfer, type IRoute, IRouteHot } from '@/api/http-route'
import { useCurrent } from '@/locale/instance'
import { sompute } from '@/utils/utils-remix'
import { createElement } from '@/utils/utils-instance'
import { createDiscover, createNotice } from '@/utils/utils-naive'
import { divineHandler, divineAndSelecter, divineDelay } from '@/utils/utils-common'
import { fetchRule } from '@/views/manager/hooks/fetch-instance'

export default defineComponent({
    name: 'ComposeRule',
    props: {
        node: { type: Object as PropType<IRoute>, required: true }
    },
    emits: ['update'],
    setup(props, { emit }) {
        const { t } = useCurrent()
        const { copy, isSupported } = useClipboard()

        async function onSelecter(key: string, app: { done: Function }) {
            /**复制规则接口**/
            await divineHandler(key === 'clipboard', async () => {
                return await divineHandler(isSupported.value, async () => {
                    try {
                        await copy(props.node.path)
                        return await createNotice({ title: t('common.copy.notice') })
                    } catch (e) {
                        return await createNotice({ type: 'error', title: t('common.copy.fail') })
                    }
                }).then(result => {
                    return divineHandler(!result, () => {
                        return createNotice({ type: 'error', title: t('common.copy.supported') })
                    })
                })
            })

            /**编辑规则**/
            await divineHandler(key === 'update', () => {
                return fetchRule({
                    title: t('common.update.enter', { name: t('rule.common.name') }),
                    command: 'UPDATE',
                    id: props.node.id
                }).then(({ observer }) => {
                    observer.on('submit', ({ done }) => {
                        done({ visible: false }).finally(() => emit('update'))
                    })
                })
            })

            /**启用、禁用规则**/
            await divineHandler(['disable', 'enable'].includes(key), async () => {
                try {
                    await app.done(true)
                    await httpRuleTransfer({ id: props.node.id, status: key as IRoute['status'] })
                    await divineDelay(300)
                    return await createNotice({
                        title: t(`common.${key}.enter` as Parameters<typeof t>['0']),
                        onAfterEnter: () => emit('update')
                    }).then(() => app.done(false))
                } catch (e) {
                    return await createNotice({
                        type: 'error',
                        title: e.message
                    }).then(() => app.done(false))
                }
            })

            /**删除规则**/
            await divineHandler(key === 'delete', async () => {
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
                        try {
                            await done(true)
                            await httpRuleTransfer({ id: props.node.id, status: 'delete' })
                            await divineDelay(300)
                            return await createNotice({
                                title: t('common.delete.notice'),
                                onAfterEnter: () => emit('update')
                            }).then(() => true)
                        } catch (e) {
                            return await createNotice({
                                type: 'error',
                                title: e.message,
                                onAfterEnter: () => done(false)
                            }).then(() => false)
                        }
                    }
                })
            })
        }

        return () => (
            <n-alert class="compose-rule" show-icon={false} type={IRouteHot[props.node.method] ?? IRouteHot.Default}>
                <n-button type={IRouteHot[props.node.method] ?? IRouteHot.Default} size="small" strong style={{ minWidth: '80px' }}>
                    {props.node.method}
                </n-button>
                <n-text class="compose-rule__content">
                    <n-text style={{ overflow: 'hidden', marginRight: '12px' }}>
                        <n-ellipsis tooltip={false}>
                            <n-h4 inline>{`${props.node.title}：`}</n-h4>
                            <n-text>{props.node.path}</n-text>
                        </n-ellipsis>
                    </n-text>
                    <common-mode value={props.node.status}></common-mode>
                </n-text>
                <n-space align="center" wrap-item={false} size={5}>
                    <common-remix
                        size={18}
                        title={t('common.copy.value')}
                        icon={sompute('CopyRound')}
                        onTrigger={(app: never) => onSelecter('clipboard', app)}
                    ></common-remix>
                    <common-dropdown
                        command={divineAndSelecter([
                            { key: 'update', visible: true },
                            { key: 'delete', visible: true },
                            { key: 'disable', visible: props.node.status === 'enable' },
                            { key: 'enable', visible: props.node.status === 'disable' }
                        ])}
                        onSelecter={onSelecter}
                    >
                        <common-remix size={18} icon={sompute('RadixMore')}></common-remix>
                    </common-dropdown>
                </n-space>
            </n-alert>
        )
    }
})
</script>

<style lang="scss" scoped>
.compose-rule {
    box-sizing: border-box;
    padding: 6px;
    overflow: hidden;
    :deep(.n-alert-body) {
        padding: 0;
    }
    :deep(.n-alert-body__content) {
        display: flex;
        align-items: center;
        line-height: var(--height-small);
        overflow: hidden;
    }
    &__content {
        flex: 1;
        display: flex;
        align-items: center;
        overflow: hidden;
        margin: 0 30px 0 10px;
        font-size: 16px;
    }
}
</style>
