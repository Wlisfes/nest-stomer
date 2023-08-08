import { h, createVNode, type VNode, type CSSProperties } from 'vue'
import { type IconProps, type IconWrapperProps } from 'naive-ui'

export const RemixUI = {
    AddBold: h(<Icon-AddBold />),
    AddRound: h(<Icon-AddRound />),
    ArrowDownBold: h(<Icon-ArrowDownBold />),
    ArrowLeftBold: h(<Icon-ArrowLeftBold />),
    ArrowRightBold: h(<Icon-ArrowRightBold />),
    ArrowUpBold: h(<Icon-ArrowUpBold />),
    CloseBold: h(<Icon-CloseBold />),
    CloseRound: h(<Icon-CloseRound />),
    CopyRound: h(<Icon-CopyRound />),
    DeleteBold: h(<Icon-DeleteBold />),
    DisableRound: h(<Icon-DisableRound />),
    EnableRound: h(<Icon-EnableRound />),
    InduceBold: h(<Icon-InduceBold />),
    IssueRound: h(<Icon-IssueRound />),
    RadixEdit: h(<Icon-RadixEdit />),
    RadixMore: h(<Icon-RadixMore />),
    RadixSpin: h(<Icon-RadixSpin />),
    RadixSpinWith: h(<Icon-RadixSpinWith />),
    SemiBold: h(<Icon-SemiBold />),
    SlackBold: h(<Icon-SlackBold />),
    WarningRound: h(<Icon-WarningRound />),
    HomeOutlined: h(<Icon-HomeOutlined />),
    Debugger: h(<Icon-Debugger />),
    SearchBlod: h(<Icon-SearchBlod />)
}

/**图标类型拆解**/
export type INameUI = keyof typeof RemixUI

/**图标拆解函数**/
export function compute(name: INameUI): VNode {
    return createVNode(RemixUI[name])
}

/**图标组合函数**/
export function sompute(name: INameUI, iconProps: IconProps & { style?: CSSProperties } = {}) {
    return createVNode(
        <n-icon color={iconProps.color} depth={iconProps.depth} size={iconProps.size} style={iconProps.style} component={compute(name)} />
    )
}

/**背景图标拆解函数**/
export function wrapper(
    name: INameUI,
    wrapperProps: IconWrapperProps & { style?: CSSProperties } = {},
    iconProps: IconProps & { style?: CSSProperties } = {}
) {
    return createVNode(
        <n-icon-wrapper
            size={wrapperProps.size ?? 24}
            border-radius={wrapperProps.borderRadius ?? 6}
            icon-color={wrapperProps.iconColor}
            color={wrapperProps.color}
            style={wrapperProps.style}
            v-slots={{ default: () => sompute(name, iconProps) }}
        ></n-icon-wrapper>
    )
}
