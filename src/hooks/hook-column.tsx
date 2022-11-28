import { h, computed, CSSProperties, VNode } from 'vue'
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
    ): VNode => {
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
    const divineCommand = <T extends Object>(
        row: T,
        props: { native: Array<ICommand>; onSelecter?: (key: ICommand, row: T) => void }
    ): VNode => {
        const command = [
            { label: '编辑', key: 'edit', icon: 'EditOutlined', color: '#1890ff' },
            { label: '删除', key: 'delete', icon: 'DeleteOutlined', color: '#ff4d4f' },
            { label: '重置密码', key: 'reset', icon: 'ReloadOutlined', color: '#f5222d' }
        ]
        const native = computed(() => props.native.map(key => command.find(x => key === x.key)))

        return (
            <n-space justify="center">
                <n-dropdown
                    options={native.value as Array<any>}
                    show-arrow
                    trigger="click"
                    placement="top-end"
                    render-icon={(u: any) => h(<Icon {...{ color: u.color, component: compute(u.icon) }}></Icon>)}
                    render-label={(u: any) => h(<n-text style={{ color: u.color }}>{u.label}</n-text>)}
                    onSelect={(key: ICommand) => props.onSelecter?.(key, row)}
                >
                    <n-button size="small" type="info" tertiary strong>
                        操作
                    </n-button>
                </n-dropdown>
                <n-button size="small" tertiary strong>
                    启用
                </n-button>
            </n-space>
        )
    }

    return { vars, common, divineColumn, divineRxicon, divineButton, divineCmule, divineCommand }
}
