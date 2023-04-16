import { h, computed, CSSProperties, VNode } from 'vue'
import { NEl, TagProps, ButtonProps, DropdownOption, IconProps } from 'naive-ui'
import { isEmpty } from 'class-validator'
import { ICommon } from '@/interface/fetch-core'
import { useRxicon, INode } from '@/hooks/hook-icon'
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
        //prettier-ignore
        return vnode ?? h(<n-el tag="span" style={style}>{value}</n-el>)
    }

    /**图标列**/
    const divineRxicon = (value: unknown, props: IconProps = {}, style: CSSProperties = {}): VNode => {
        return h(
            <n-el tag="div" style={{ ...common.divine, ...style }}>
                <Icon {...{ size: 24, depth: 5, ...props, component: compute(value as INode) }}></Icon>
            </n-el>
        )
    }

    /**按钮列**/
    const divineButton = (value: unknown, props: ButtonProps = {}, attr: { class?: string; style?: CSSProperties } = {}): VNode => {
        return (
            <n-button {...{ ...props }} class={attr?.class} style={attr?.style}>
                {value}
            </n-button>
        )
    }

    /**标签列**/
    const divineCmule = (value: unknown, props: TagProps = {}, attr: { class?: string; style?: CSSProperties } = {}): VNode => {
        return h(
            <n-el tag="div" style={common.divine}>
                <n-tag {...{ ...props, size: props.size ?? 'small' }} style={{ ...common.cmule, ...attr.style }} class={attr.class}>
                    {value}
                </n-tag>
            </n-el>
        )
    }

    /**操作列**/
    const divineCommand = <T extends ICommon>(
        row: T,
        props?: {
            native: Array<DropdownOption & { color?: string }>
            onSelecter?: (key: string, row: T) => void
        }
    ): VNode => {
        return (
            <n-space justify="center">
                {!!props?.native?.length && (
                    <n-dropdown
                        options={props.native}
                        show-arrow
                        trigger="click"
                        placement="top-end"
                        render-icon={(u: any) => h(<Icon {...{ color: u.color, component: compute(u.icon) }}></Icon>)}
                        render-label={(u: any) => h(<n-text style={{ color: u.color }}>{u.label}</n-text>)}
                        onSelect={(key: string) => props.onSelecter?.(key, row)}
                    >
                        <n-button size="small" type="info" tertiary strong>
                            操作
                        </n-button>
                    </n-dropdown>
                )}
                <n-button size="small" tertiary strong>
                    启用
                </n-button>
            </n-space>
        )
    }

    return { vars, common, divineColumn, divineRxicon, divineButton, divineCmule, divineCommand }
}
