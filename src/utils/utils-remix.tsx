import { h, type VNode } from 'vue'

export const RemixUI = {
    AddBold: h(<Icon-HomeOutlined />),
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
    HomeOutlined: h(<Icon-HomeOutlined />)
}

/**icon类型拆解**/
export type INodeUI = keyof typeof RemixUI

/**@ts-ignore、icon拆解函数**/
export function compute(name: INodeUI): VNode {
    return h(RemixUI[name])
}
