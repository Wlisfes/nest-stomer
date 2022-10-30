import { h, CSSProperties, VNode } from 'vue'
import { TagProps, ButtonProps, DropdownOption } from 'naive-ui'
import { isEmpty } from 'class-validator'
import { ICommand } from '@/interface/fetch-core'
import { useRxicon, INode, INodeProps } from '@/hooks/hook-icon'
import { useProvider } from '@/hooks/hook-provider'

export function useColumn() {
    const common: Record<string, CSSProperties> = {
        divine: { display: 'inline-flex', minHeight: '34px', alignItems: 'center' },
        cmule: { cursor: 'pointer', height: '24px', userSelect: 'none' }
    }
    const { vars } = useProvider()
    const { Icon, compute } = useRxicon()

    /**自定义展示**/
    const divineColumn = (value: unknown, vnode?: VNode, style?: CSSProperties): VNode => {
        if (isEmpty(value)) {
            return divineRxicon('DashOutlined')
        }
        return vnode ?? h(<n-text style={style}>{value}</n-text>)
    }

    /**图标列**/
    const divineRxicon = (value: unknown, props: INodeProps = {}, style: CSSProperties = {}): VNode => {
        return h(
            <n-el tag="div" style={{ ...common.divine, ...style }}>
                <Icon {...{ size: 24, depth: 5, ...props, component: compute(value as INode) }}></Icon>
            </n-el>
        )
    }

    /**按钮列**/
    const divineButton = (
        value: unknown,
        props: ButtonProps = {},
        attr: { class?: string; style?: CSSProperties } = {}
    ): VNode => {
        return (
            <n-button {...{ ...props }} class={attr?.class} style={attr?.style}>
                {value}
            </n-button>
        )
    }

    /**标签列**/
    const divineCmule = (
        value: unknown,
        props: TagProps = {},
        attr: { class?: string; style?: CSSProperties } = {}
    ) => {
        return h(
            <n-el tag="div" style={common.divine}>
                <n-tag
                    {...{ ...props, size: props.size ?? 'small' }}
                    style={{ ...common.cmule, ...attr.style }}
                    class={attr.class}
                >
                    {value}
                </n-tag>
            </n-el>
        )
    }

    /**操作列**/
    const divineComman = <T extends Object>(
        row: T,
        props: { native: Array<ICommand>; onSelecter?: (key: ICommand, row: T) => void }
    ) => {
        const command = [
            { label: '编辑', key: 'edit', icon: 'EditOutlined', color: '#1890ff' },
            { label: '删除', key: 'delete', icon: 'DeleteOutlined', color: '#ff4d4f' },
            { label: '重置密码', key: 'reset', icon: 'ReloadOutlined', color: '#f5222d' }
        ]
    }

    return { vars, common, divineColumn, divineRxicon, divineButton, divineCmule, divineComman }
}
