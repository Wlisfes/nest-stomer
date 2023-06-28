<script lang="tsx">
import { defineComponent, Fragment, type PropType, type VNodeChild } from 'vue'
import { useState } from '@/hooks/hook-state'
import { type Scheme } from '@/api/http-interface'
interface NodeProps extends Scheme, Record<string, unknown> {
    title: string
}

export default defineComponent({
    name: 'CommonSourceColumn',
    props: {
        node: { type: Object as PropType<NodeProps> },
        bordered: { type: Boolean, default: true },
        collapse: { type: Boolean, default: true },
        dataRender: { type: Function as PropType<(e: Record<string, unknown>) => VNodeChild> }
    },
    setup(props, { slots }) {
        const { visible, setState } = useState({ visible: false })

        async function onCollapse() {
            return await setState({ visible: !visible.value })
        }

        return () => (
            <n-el class={{ 'common-source__column': true, 'is-bordered': props.bordered }}>
                <div class={{ 'source-header': true, 'n-pointer': props.collapse }} onClick={() => props.collapse && onCollapse()}>
                    <div class="source-header__content n-display">
                        <n-icon size={28} style={{ marginRight: '10px' }} component={<Icon-HomeOutlined />}></n-icon>
                        <n-h3 style={{ flex: 1, margin: 0 }}>{props.node?.title}</n-h3>
                    </div>
                    <div class="n-display n-center" style={{ paddingRight: props.collapse ? 0 : '4px' }}>
                        <common-remix space={4} size={20} icon={<n-icon component={<Icon-RadixMore />}></n-icon>}></common-remix>
                        {props.collapse && (
                            <div class="source-header__extra n-display n-center n-middle">
                                <n-icon size={18} class={{ 'is-visible': visible.value }}>
                                    <Icon-ArrowRightBold />
                                </n-icon>
                            </div>
                        )}
                    </div>
                </div>
                <div class="source-container">
                    {slots.default ? (
                        <Fragment>{slots.default({ visible: visible.value, done: () => props.collapse && onCollapse() })}</Fragment>
                    ) : props.dataRender ? (
                        <Fragment>{props.dataRender({ visible: visible.value, done: () => props.collapse && onCollapse() })}</Fragment>
                    ) : null}
                </div>
            </n-el>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-source__column {
    position: relative;
    border-radius: var(--border-radius);
    box-sizing: border-box;
    background-color: var(--card-color);
    word-break: break-word;
    transition: color 0.3s var(--n-bezier), background-color 0.3s var(--n-bezier), border-color 0.3s var(--n-bezier);
    &.is-bordered {
        border: 1px solid var(--divider-color);
    }
    .source-container {
        color: var(--text-color-2);
        font-size: var(--font-size);
        line-height: var(--height-tiny);
    }
    .source-header {
        display: flex;
        padding: 12px 10px 12px 14px;
        color: var(--text-color-1);
        &__extra {
            width: 26px;
            height: 26px;
            .n-icon {
                transition: transform 0.3s var(--cubic-bezier-ease-in-out);
                color: var(--text-color-2);
                &.is-visible {
                    transform: rotateZ(90deg);
                }
            }
        }
        &__content {
            flex: 1;
            overflow: hidden;
            line-height: var(--height-small);
        }
    }
}
</style>
