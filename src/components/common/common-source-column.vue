<script lang="tsx">
import { defineComponent, Fragment, type PropType } from 'vue'
import { useState } from '@/hooks/hook-state'
import { type Scheme } from '@/api/http-interface'
interface NodeProps extends Scheme, Record<string, unknown> {
    title: string
}

export default defineComponent({
    name: 'CommonSourceColumn',
    props: {
        node: {
            type: Object as PropType<NodeProps>
        },
        bordered: {
            type: Boolean,
            default: true
        },
        collapse: {
            type: Boolean,
            default: true
        }
    },
    setup(props, { slots }) {
        const { visible, setState } = useState({ visible: false })

        async function onCollapse() {
            return await setState({ visible: !visible.value })
        }

        return () => (
            <n-el class={{ 'common-source__column': true, 'is-bordered': props.bordered, 'is-collapse': props.collapse }}>
                <div class={{ 'source-header': true, 'n-pointer': props.collapse }} onClick={() => props.collapse && onCollapse()}>
                    <div class="source-header__content n-display">
                        <n-icon size={28} style={{ marginRight: '10px' }} component={<Icon-HomeOutlined />}></n-icon>
                        <n-h3 style={{ flex: 1, margin: 0 }}>{props.node?.title}</n-h3>
                    </div>
                    {props.collapse && (
                        <div class="source-header__extra n-display n-center n-middle">
                            <n-icon size={16} class={{ 'is-visible': visible.value }}>
                                <Icon-ArrowRightBold />
                            </n-icon>
                        </div>
                    )}
                </div>
                <div class="source-container">
                    <Fragment>{slots.default?.({ visible: visible.value, done: () => props.collapse && onCollapse() })}</Fragment>
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
    &.is-collapse > .source-header {
        padding-right: 0;
    }
    .source-container {
        color: var(--text-color-2);
        font-size: var(--font-size);
        line-height: var(--height-tiny);
    }
    .source-header {
        display: flex;
        padding: 12px 14px;
        color: var(--text-color-1);
        &__extra {
            width: 28px;
            height: 28px;
            margin-right: 6px;
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
