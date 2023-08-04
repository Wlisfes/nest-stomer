<script lang="tsx">
import { defineComponent, computed, type PropType } from 'vue'
import { useClipboard } from '@vueuse/core'
import { type IRoute, IMethod } from '@/api/http-route'
import { useCurrent } from '@/locale/instance'
import { divineHandler } from '@/utils/utils-common'
import { sompute } from '@/utils/utils-remix'

export default defineComponent({
    name: 'ComposeRule',
    props: {
        node: { type: Object as PropType<IRoute>, required: true }
    },
    emits: ['selecter', 'create', 'update', 'delete', 'disable', 'enable'],
    setup(props, { emit }) {
        const { t } = useCurrent()
        const { text, copy, isSupported } = useClipboard()
        const methodType = computed(() => IMethod[props.node.method] ?? IMethod.Default)
        const dataCommand = computed(() => {
            return [
                { key: 'update', visible: true },
                { key: 'delete', visible: true },
                { key: 'disable', visible: props.node.status === 'enable' },
                { key: 'enable', visible: props.node.status === 'disable' }
            ].reduce((and: string[], next) => (next.visible ? and.concat(next.key) : and), [])
        })

        /**规则指令**/
        function onSelecter(key: Parameters<typeof emit>['0'], app: unknown) {
            emit(key, key, props.node, app)
            emit('selecter', key, props.node, app)
        }

        /**复制规则接口**/
        async function onClipboar() {
            await divineHandler(isSupported.value, async () => {
                try {
                    await copy(props.node.path)
                    return await window.$notification.success({ title: t('common.copy.notice'), duration: 2000 })
                } catch (e) {
                    window.$notification.error({ title: t('common.copy.fail'), duration: 2500 })
                }
            }).then(result => {
                return divineHandler(!result, () => {
                    window.$notification.error({ title: t('common.copy.supported'), duration: 2500 })
                })
            })
        }

        return () => (
            <n-alert class="compose-rule" show-icon={false} type={methodType.value}>
                <n-button type={methodType.value} size="small" strong style={{ minWidth: '80px' }}>
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
                        onTrigger={onClipboar}
                    ></common-remix>
                    <common-dropdown command={dataCommand.value} onSelecter={onSelecter}>
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
