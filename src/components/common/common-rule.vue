<script lang="tsx">
import { defineComponent, computed, type PropType } from 'vue'
import { useClipboard } from '@vueuse/core'
import { type IRule, IMethod } from '@/api/http-route'
import { useCurrent } from '@/locale/instance'
import { divineChained } from '@/utils/utils-common'
import { sompute } from '@/utils/utils-remix'

export default defineComponent({
    name: 'CommonRule',
    props: {
        node: { type: Object as PropType<IRule>, required: true }
    },
    emits: ['selecter'],
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

        /**复制规则接口**/
        async function onClipboar() {
            try {
                await divineChained(
                    () => isSupported.value || new Error(t('common.copy.supported')),
                    () => copy(props.node.path).then(() => text.value === props.node.path)
                ).then(() => {
                    window.$notification.success({ title: t('common.copy.notice'), duration: 2000 })
                })
            } catch (e) {
                window.$notification.error({ title: e.message || t('common.copy.fail'), duration: 2500 })
            }
        }

        return () => (
            <n-alert class="common-rule" show-icon={false} type={methodType.value}>
                <n-button type={methodType.value} size="small" strong style={{ minWidth: '80px' }}>
                    {props.node.method}
                </n-button>
                <n-text class="common-rule__content">
                    <div style={{ overflow: 'hidden', marginRight: '12px' }}>
                        <n-ellipsis tooltip={false}>{props.node.path}</n-ellipsis>
                    </div>
                    <common-mode value={props.node.status}></common-mode>
                </n-text>
                <n-space align="center" wrap-item={false} size={5}>
                    <common-remix
                        size={18}
                        title={t('common.copy.value')}
                        icon={sompute('CopyRound')}
                        onTrigger={onClipboar}
                    ></common-remix>
                    <common-dropdown command={dataCommand.value} onSelecter={(key: string) => emit('selecter', key, props.node)}>
                        <common-remix size={18} icon={sompute('RadixMore')}></common-remix>
                    </common-dropdown>
                </n-space>
            </n-alert>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-rule {
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
