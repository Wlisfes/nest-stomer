<script lang="tsx">
import { defineComponent, computed, type PropType } from 'vue'
import { useClipboard } from '@vueuse/core'
import { type IRule, IMethod } from '@/api/http-route'
import { divineChained } from '@/utils/utils-common'

export default defineComponent({
    name: 'CommonRule',
    props: {
        node: {
            type: Object as PropType<IRule>,
            required: true
        }
    },
    setup(props) {
        const { text, copy, isSupported } = useClipboard()
        const type = computed(() => {
            return IMethod[props.node.method] ?? IMethod.Default
        })

        async function onClipboar() {
            try {
                await divineChained(
                    () => isSupported.value || new Error('当前浏览器不支持剪贴板API'),
                    () => copy(props.node.path)
                ).then(() => {
                    window.$notification.success({ title: '复制成功', duration: 2000 })
                })
            } catch (e) {
                window.$notification.error({ title: e.message || '复制失败', duration: 2500 })
            }
        }

        return () => (
            <n-button class="common-rule" tag="div" size="large" type={type.value} focusable={false} secondary bordered>
                <n-button type={type.value} size="small" strong style={{ minWidth: '80px' }}>
                    {props.node.method}
                </n-button>
                <n-h4 class="common-rule__content">
                    <n-ellipsis tooltip={false}>{props.node.path + props.node.path + props.node.path + props.node.path}</n-ellipsis>
                </n-h4>
                <common-remix size={18} icon={<n-icon component={<Icon-RadixCircleCopy />}></n-icon>} onTrigger={onClipboar}></common-remix>
                <common-remix
                    icon={<n-icon size={18} component={<Icon-RadixMore />}></n-icon>}
                    style={{ marginLeft: '4px' }}
                ></common-remix>
            </n-button>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-rule {
    position: relative;
    display: flex;
    justify-content: flex-start;
    box-sizing: border-box;
    padding: 5px;
    overflow: hidden;
    background-color: var(--n-color) !important;
    &.n-button--info-type {
        border: 1px solid var(--info-color);
    }
    &.n-button--success-type {
        border: 1px solid var(--success-color);
    }
    &.n-button--warning-type {
        border: 1px solid var(--warning-color);
    }
    &.n-button--error-type {
        border: 1px solid var(--error-color);
    }
    :deep(> .n-button__content) {
        flex: 1;
        text-align: left;
    }

    &__content {
        flex: 1;
        overflow: hidden;
        margin: 0 30px 0 10px;
        line-height: var(--height-small);
    }
}
</style>
