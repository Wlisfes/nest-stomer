import { h, CSSProperties, VNode } from 'vue'
import { useRxicon } from '@/hooks/hook-icon'
import { IColumn } from '@/interface/fetch-core'

export function useColumn<R = any>(option?: IColumn<R>) {
    const { Icon, compute } = useRxicon()

    /**计算列百分比**/
    const calcColumn = (width: number, max: number = 1080) => {
        return (width / max) * 100 + '%'
    }

    /**空占位列**/
    const divineColumn = (value: unknown, style?: CSSProperties): VNode => {
        if (![undefined, null, ''].includes(value as never)) {
            return h(<n-text>{value}</n-text>)
        }
        return h(
            <div style={{ display: 'flex', ...style }}>
                {h(Icon, { size: 20, depth: 3, component: compute('DashOutlined') })}
            </div>
        )
    }

    return { calcColumn, divineColumn }
}
