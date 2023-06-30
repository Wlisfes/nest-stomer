<script lang="tsx">
import { defineComponent, computed, type PropType } from 'vue'
import { useClipboard } from '@vueuse/core'
import { type IRule, IMethod } from '@/api/http-route'
import { useCurrent } from '@/locale/instance'
import { divineChained } from '@/utils/utils-common'

export default defineComponent({
    name: 'CommonRule',
    props: {
        node: {
            type: Object as PropType<IRule>,
            required: true
        }
    },
    emits: ['selecter'],
    setup(props, { emit }) {
        const { t } = useCurrent()
        const { text, copy, isSupported } = useClipboard()
        const type = computed(() => {
            return IMethod[props.node.method] ?? IMethod.Default
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
            <n-alert class="common-rule" show-icon={false} type={type.value}>
                <n-button type={type.value} size="small" strong style={{ minWidth: '80px' }}>
                    {props.node.method}
                </n-button>
                <n-h4 class="common-rule__content">
                    <div style={{ overflow: 'hidden', marginRight: '12px' }}>
                        <n-ellipsis tooltip={false}>{props.node.path}</n-ellipsis>
                    </div>
                    <common-mode value={props.node.status}></common-mode>
                </n-h4>
                <n-space align="center" wrap-item={false} size={5}>
                    <common-remix
                        size={18}
                        title={t('common.copy.value')}
                        icon={<n-icon component={<Icon-RadixCircleCopy />}></n-icon>}
                        onTrigger={onClipboar}
                    ></common-remix>
                    <common-dropdown command={['update', 'delete']} onSelecter={(key: string) => emit('selecter', key, props.node)}>
                        <common-remix size={18} icon={<n-icon component={<Icon-RadixMore />}></n-icon>}></common-remix>
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
    }
}
</style>
