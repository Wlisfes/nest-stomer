import { type DialogOptions, type DialogReactive } from 'naive-ui'

/**对话弹窗二次封装**/
export function createDiscover(
    option: Omit<DialogOptions, 'onAfterEnter' | 'onAfterLeave' | 'onClose' | 'onEsc' | 'onNegativeClick' | 'onPositiveClick'> & {
        onAfterEnter?: (e: HTMLElement, x: DialogReactive) => void | undefined
        onAfterLeave?: (x: DialogReactive) => void | undefined
        onClose?: (x: DialogReactive) => boolean | Promise<boolean> | any
        onEsc?: (x: DialogReactive) => void | undefined
        onNegativeClick?: (e: MouseEvent, x: DialogReactive) => boolean | Promise<boolean> | any
        onPositiveClick?: (e: MouseEvent, x: DialogReactive) => boolean | Promise<boolean> | any
    }
): Promise<DialogReactive> {
    return new Promise(resolve => {
        const vm = window.$dialog.create({
            ...option,
            onAfterEnter: (e: HTMLElement) => {
                return option.onAfterEnter ? option.onAfterEnter(e, vm) : undefined
            },
            onAfterLeave: () => {
                return option.onAfterLeave ? option.onAfterLeave(vm) : undefined
            },
            onClose: () => {
                return option.onClose ? option.onClose(vm) : true
            },
            onEsc: () => {
                return option.onEsc ? option.onEsc(vm) : undefined
            },
            onNegativeClick: (e: MouseEvent) => {
                return option.onNegativeClick ? option.onNegativeClick(e, vm) : true
            },
            onPositiveClick: (e: MouseEvent) => {
                return option.onPositiveClick ? option.onPositiveClick(e, vm) : true
            }
        })
        resolve(vm)
    })
}
