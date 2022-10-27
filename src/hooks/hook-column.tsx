import { h, CSSProperties, VNode } from 'vue'
import { useRxicon, INode, INodeProps } from '@/hooks/hook-icon'

export interface IOption {
    max?: number
}

export function useColumn(option?: IOption) {
    const { Icon, compute } = useRxicon()

    /**计算列百分比**/
    function calcColumn(width: number, max: number = option?.max ?? 1080) {
        return (width / max) * 100 + '%'
    }

    /**空占位列**/
    function divineColumn(value: unknown, style?: CSSProperties): VNode {
        if ([undefined, null, ''].includes(value as never)) {
            return divineRxicon('DashOutlined', undefined, style)
        }
        return h(<n-text>{value}</n-text>)
    }

    /**图标列**/
    function divineRxicon(value: unknown, props?: INodeProps, style?: CSSProperties) {
        return (
            <dev style={{ display: 'flex', ...style }}>
                <Icon {...{ size: 24, depth: 5, ...props, component: compute(value as INode) }}></Icon>
            </dev>
        )
    }

    return { calcColumn, divineColumn, divineRxicon }
}
