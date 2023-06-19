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
        node: { type: Object as PropType<NodeProps> }
    },
    setup(props, { slots }) {
        const { visible, setState } = useState({ visible: false })

        return () => (
            <n-el class="common-source__column">
                <div class="source-header">
                    <div class="source-header__content n-display">
                        <n-h3 prefix="bar" style={{ marginBottom: 0 }}>
                            {props.node?.title}
                        </n-h3>
                    </div>
                    <div
                        class="source-header__extra n-display n-center n-middle n-pointer"
                        onClick={() => setState({ visible: !visible.value })}
                    >
                        <n-icon size={16} class={{ 'is-visible': visible.value }}>
                            <Icon-ArrowRightBold />
                        </n-icon>
                    </div>
                </div>
                <div class="source-container">
                    <Fragment>{slots.default?.({ visible: visible.value, done: setState })}</Fragment>
                </div>
            </n-el>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-source__column {
    position: relative;
    border: 1px solid var(--divider-color);
    border-radius: var(--border-radius);
    box-sizing: border-box;
    background-color: var(--card-color);
    word-break: break-word;
    transition: color 0.3s var(--n-bezier), background-color 0.3s var(--n-bezier), border-color 0.3s var(--n-bezier);
    .source-container {
        color: var(--text-color-2);
        font-size: var(--font-size);
        line-height: var(--height-tiny);
    }
    .source-header {
        display: flex;
        padding: 12px 0 12px 14px;
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
