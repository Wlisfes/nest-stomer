import { h, createVNode, type VNode } from 'vue'
import { type IconProps, type IconWrapperProps } from 'naive-ui'

export const RemixUI = {
    AddBold: h(<Icon-AddBold />),
    ArrowDownBold: h(<Icon-ArrowDownBold />),
    ArrowLeftBold: h(<Icon-ArrowLeftBold />),
    ArrowRightBold: h(<Icon-ArrowRightBold />),
    ArrowUpBold: h(<Icon-ArrowUpBold />),
    CloseBold: h(<Icon-CloseBold />),
    DeleteBold: h(<Icon-DeleteBold />),
    InduceBold: h(<Icon-InduceBold />),
    RadixEdit: h(<Icon-RadixEdit />),
    RadixMore: h(<Icon-RadixMore />),
    RadixCircleCopy: h(<Icon-RadixCircleCopy />),
    RadixSpinWith: h(<Icon-RadixSpinWith />),
    SemiBold: h(<Icon-SemiBold />),
    HomeOutlined: h(<Icon-HomeOutlined />),
    SlackBold: h(<Icon-SlackBold />)
}

/**图标类型拆解**/
export type INameUI = keyof typeof RemixUI

/**图标拆解函数**/
export function compute(name: INameUI): VNode {
    return createVNode(RemixUI[name])
}

/**图标组合函数**/
export function sompute(name: INameUI, iconProps: IconProps = {}) {
    return createVNode(<n-icon color={iconProps.color} depth={iconProps.depth} size={iconProps.size} component={compute(name)} />)
}

/**背景图标拆解函数**/
export function wrapper(name: INameUI, wrapperProps: IconWrapperProps = {}, iconProps: IconProps = {}) {
    return createVNode(
        <n-icon-wrapper
            size={wrapperProps.size ?? 24}
            border-radius={wrapperProps.borderRadius ?? 6}
            icon-color={wrapperProps.iconColor}
            color={wrapperProps.color}
            v-slots={{ default: () => sompute(name, iconProps) }}
        ></n-icon-wrapper>
    )
}