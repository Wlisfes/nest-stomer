<script lang="tsx">
import { defineComponent, Fragment, type PropType, type VNode, type CSSProperties } from 'vue'
import { useState } from '@/hooks/hook-state'
import { sompute, type INameUI } from '@/utils/utils-remix'
import { type Scheme } from '@/interface/http-interface'
interface NodeProps extends Scheme, Record<string, unknown> {
    title: string
}

export default defineComponent({
    name: 'CommonSourceColumn',
    props: {
        /**节点数据**/
        node: {
            type: Object as PropType<NodeProps>,
            required: true
        },
        /**头部左侧图标**/
        icon: {
            type: String as PropType<INameUI>
        },
        /**头部title**/
        title: {
            type: String
        },
        /**边框线**/
        bordered: {
            type: Boolean,
            default: true
        },
        /**开启头部展开**/
        collapse: {
            type: Boolean,
            default: true
        },
        /**节点内容自定义方法**/
        dataRender: {
            type: Function as PropType<(e: Record<string, unknown>) => VNode>
        },
        /**节点左侧内容自定义方法**/
        dataBefore: {
            type: Function as PropType<(e: NodeProps) => VNode>
        },
        /**节点右侧内容自定义方法**/
        dataAfter: {
            type: Function as PropType<(e: NodeProps) => VNode>
        },
        /**头部右侧图标间距**/
        extraSize: {
            type: Number,
            default: 5
        },
        /**开启头部**/
        header: {
            type: Boolean
        },
        /**外层容器样式**/
        sourceStyle: {
            type: Object as PropType<CSSProperties>,
            default: () => ({})
        },
        /**节点内容自定义样式**/
        bodyStyle: {
            type: Object as PropType<CSSProperties>,
            default: () => ({})
        },
        /**节点左侧内容自定义样式**/
        beforeStyle: {
            type: Object as PropType<CSSProperties>,
            default: () => ({})
        },
        /**节点右侧内容自定义样式**/
        afterStyle: {
            type: Object as PropType<CSSProperties>,
            default: () => ({})
        },
        /**组件排列方向**/
        direction: {
            type: String as PropType<'horizontal' | 'vertical'>,
            default: 'vertical'
        }
    },
    setup(props, { slots }) {
        const { visible, setState } = useState({ visible: false })

        /**切换收缩状态**/
        async function onCollapse() {
            return await setState({ visible: !visible.value })
        }

        console.log(slots.before, props.dataBefore)

        return () => (
            <n-el
                class={{ 'common-source__column': true, 'is-bordered': props.bordered, [`is-${props.direction}`]: true }}
                style={props.sourceStyle}
            >
                {(slots.before || props.dataBefore) && (
                    <div class="source-before" style={props.beforeStyle}>
                        {slots.before ? slots.before(props.node) : props.dataBefore?.(props.node)}
                    </div>
                )}
                <div class="source-fragment">
                    {props.header && (
                        <div class={{ 'source-header': true, 'n-pointer': props.collapse }} onClick={() => props.collapse && onCollapse()}>
                            <div class="source-header__content n-basic">
                                {props.icon && (
                                    <n-icon size={28} style={{ marginRight: '10px' }} component={<Icon-HomeOutlined />}></n-icon>
                                )}
                                <n-h3 style={{ flex: 1, margin: 0 }}>{props.title ?? ''}</n-h3>
                            </div>
                            {slots.suffix || props.collapse ? (
                                <n-space
                                    align="center"
                                    justify="center"
                                    wrap-item={false}
                                    size={props.extraSize}
                                    style={{ margin: '0 10px 0' }}
                                >
                                    {slots.suffix && slots.suffix(props.node)}
                                    {props.collapse && (
                                        <common-remix
                                            hover={false}
                                            size={18}
                                            icon={sompute('ArrowRightBold', {
                                                style: {
                                                    transition: 'transform 0.3s var(--cubic-bezier-ease-in-out)',
                                                    color: 'var(--text-color-2)',
                                                    transform: visible.value ? 'rotateZ(90deg)' : 'rotateZ(0deg)'
                                                }
                                            })}
                                        ></common-remix>
                                    )}
                                </n-space>
                            ) : (
                                <div style={{ paddingRight: '14px' }} />
                            )}
                        </div>
                    )}
                    <div class="source-container" style={props.bodyStyle}>
                        {slots.default ? (
                            <Fragment>{slots.default({ visible: visible.value, done: () => props.collapse && onCollapse() })}</Fragment>
                        ) : props.dataRender ? (
                            <Fragment>{props.dataRender({ visible: visible.value, done: () => props.collapse && onCollapse() })}</Fragment>
                        ) : null}
                    </div>
                </div>
                {(slots.after || props.dataAfter) && (
                    <div class="source-after" style={props.afterStyle}>
                        {slots.after ? slots.after(props.node) : props.dataAfter?.(props.node)}
                    </div>
                )}
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
    &.is-vertical {
        display: flex;
        flex-direction: column;
    }
    &.is-horizontal {
        display: flex;
        flex-direction: row;
    }
    .source-before,
    .source-after {
        position: relative;
        display: flex;
        flex-direction: column;
    }
    .source-fragment {
        position: relative;
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .source-container {
        color: var(--text-color-2);
        font-size: var(--font-size);
        line-height: var(--height-tiny);
    }
    .source-header {
        display: flex;
        padding: 12px 0 12px 14px;
        color: var(--text-color-1);
        &__content {
            flex: 1;
            overflow: hidden;
            line-height: var(--height-small);
        }
    }
}
</style>
