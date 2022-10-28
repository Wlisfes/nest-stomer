import { h, CSSProperties, VNode } from 'vue'
import { isEmpty } from 'class-validator'
import { useRxicon, INode, INodeProps } from '@/hooks/hook-icon'

export function useColumn() {
    const common: Record<string, CSSProperties> = {
        divine: { display: 'inline-flex', minHeight: '34px', alignItems: 'center' },
        online: { cursor: 'pointer', height: '24px', userSelect: 'none' }
    }
    const { Icon, compute } = useRxicon()

    /**自定义展示**/
    const divineColumn = (value: unknown, vnode?: VNode, style?: CSSProperties): VNode => {
        if (isEmpty(value)) {
            return divineRxicon('DashOutlined')
        }
        //prettier-ignore
        return (vnode ?? h(
            <n-el tag="div" style={{ ...common.divine }}>
                <n-text style={style}>{value}</n-text>
            </n-el>
        ))
    }

    /**图标列**/
    const divineRxicon = (value: unknown, props?: INodeProps, style?: CSSProperties): VNode => {
        return h(
            <n-el tag="div" style={{ ...common.divine, ...style }}>
                <Icon {...{ size: 24, depth: 5, ...props, component: compute(value as INode) }}></Icon>
            </n-el>
        )
    }

    return { common, divineColumn, divineRxicon }
}
