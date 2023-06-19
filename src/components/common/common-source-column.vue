<script lang="tsx">
import { defineComponent, Fragment, computed, type CSSProperties, type PropType } from 'vue'
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
        const headerStyle = computed<CSSProperties>(() => ({
            padding: 0
        }))

        return () => (
            <div>
                <n-el class="common-source__column n-card">
                    <div class="source-header">
                        <div class="source-header__content">
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
                        <Fragment>{slots.default?.({ visible, done: setState })}</Fragment>
                    </div>
                </n-el>
                <n-card
                    title="可以被分段。分段分割线会在区域的上方出现可以被分段。分段分割线会在区域的上方出现可以被分段。分段分割线会在区域的上方出现可以被分段。分段分割线会在区域的上方出现"
                    header-style={headerStyle.value}
                >
                    {{
                        'header-extra': () => <div>11111</div>,
                        default: () => (
                            <Fragment>
                                <div onClick={() => setState({ visible: !visible.value })}>232312</div>
                                <common-collapse visible={visible.value}>
                                    <div>
                                        content 和 footer 可以被分段或 soft 分段，action 可以被分段。分段分割线会在区域的上方出现。content
                                        和 footer 可以被分段或 soft 分段，action 可以被分段。分段分割线会在区域的上方出现。content 和 footer
                                        可以被分段或 soft 分段，action 可以被分段。分段分割线会在区域的上方出现。content 和 footer
                                        可以被分段或 soft 分段，action 可以被分段。分段分割线会在区域的上方出现。
                                    </div>
                                </common-collapse>
                            </Fragment>
                        )
                    }}
                </n-card>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-source__column {
    position: relative;
    border: 1px solid var(--divider-color);
    margin-bottom: 10px;
    .source-header {
        display: flex;
        padding: 12px 0 12px 14px;
        &__extra {
            width: 28px;
            height: 28px;
            margin-right: 6px;
            .n-icon {
                color: var(--text-color-1);
                transition: transform 0.3s var(--cubic-bezier-ease-in-out);
                &.is-visible {
                    transform: rotateZ(90deg);
                }
            }
        }
        &__content {
            flex: 1;
            line-height: var(--height-small);
        }
    }
}
</style>
