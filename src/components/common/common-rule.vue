<script lang="tsx">
import { defineComponent, computed, Fragment, type PropType } from 'vue'
import { useClipboard } from '@vueuse/core'
import { type IRule, IMethod } from '@/api/http-route'
import { useCurrent } from '@/locale/instance'
import { divineChained } from '@/utils/utils-common'
import { fetchRule } from '@/views/manager/hooks/auto-compute'

export default defineComponent({
    name: 'CommonRule',
    props: {
        node: {
            type: Object as PropType<IRule>,
            required: true
        }
    },
    setup(props) {
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

        /**规则弹窗表单**/
        function fetchUseRule() {
            fetchRule().then(e => {
                console.log(e)
            })
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
                <div class="n-display" style={{ columnGap: '5px' }}>
                    <common-remix
                        size={18}
                        title={t('common.copy.title')}
                        icon={<n-icon component={<Icon-RadixCircleCopy />}></n-icon>}
                        onTrigger={onClipboar}
                    ></common-remix>
                    <common-remix icon={<n-icon size={18} component={<Icon-RadixEdit />}></n-icon>} onTrigger={fetchUseRule}></common-remix>
                    <common-remix icon={<n-icon size={18} component={<Icon-AddBold />}></n-icon>}></common-remix>
                    <common-remix icon={<n-icon size={18} component={<Icon-RadixMore />}></n-icon>}></common-remix>
                </div>
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
