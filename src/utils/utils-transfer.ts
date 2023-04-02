interface CInstance {
    left: number
    top: number
    currentX: number
    currentY: number
    run: boolean
}

const instance: CInstance = {
    left: 0,
    top: 0,
    currentX: 0,
    currentY: 0,
    run: false
}

const useCurrent = (target: HTMLElement & Record<string, never>, key: string) => {
    if (target.currentStyle) {
        return target.currentStyle[key]
    }
    return document.defaultView?.getComputedStyle(target, null)[key as never]
}

export function transfer(target: HTMLElement & Record<string, never>, callback?: Function) {
    const screenWidth = document.body.clientWidth //body当前宽度
    const screenHeight = document.documentElement.clientHeight //可见区域高度

    const offsetWidth = target.offsetWidth //对话框宽度
    const offsetHeight = target.offsetHeight //对话框高度
    const offsetLeft = target.offsetLeft
    const offsetTop = target.offsetTop

    const maxDragDomLeft = screenWidth - offsetLeft - offsetWidth
    const maxDragDomTop = screenHeight - offsetTop - offsetHeight

    if (useCurrent(target, 'left') !== 'auto') {
        instance.left = useCurrent(target, 'left') as never
    }
    if (useCurrent(target, 'top') !== 'auto') {
        instance.top = useCurrent(target, 'top') as never
    }

    const element = target.querySelector('.n-dialog__title') as HTMLElement
    if (element) {
        element.style.cursor = 'move'
        element.onmousedown = function (event) {
            instance.run = true
            if (!event) {
                event = window.event as MouseEvent
                //防止IE文字选中
                element.onselectstart = function () {
                    return false
                }
            }
            instance.currentX = event.clientX
            instance.currentY = event.clientY
        }
    }

    document.onmouseup = function (e) {
        instance.run = false
        if (useCurrent(target, 'left') !== 'auto') {
            instance.left = useCurrent(target, 'left') as never
        }
        if (useCurrent(target, 'top') !== 'auto') {
            instance.top = useCurrent(target, 'top') as never
        }
    }

    document.onmousemove = function (event) {
        const e: any = event ? event : window.event
        if (instance.run) {
            const nowX = e.clientX
            const nowY = e.clientY
            const disX = nowX - instance.currentX
            const disY = nowY - instance.currentY

            let left = parseInt(instance.left as never) + disX
            let top = parseInt(instance.top as never) + disY

            // 拖出屏幕边缘
            if (-left > offsetLeft) {
                left = -offsetLeft
            } else if (left > maxDragDomLeft) {
                left = maxDragDomLeft
            }

            if (-top > offsetTop) {
                top = -offsetTop
            } else if (top > maxDragDomTop) {
                top = maxDragDomTop
            }

            target.style.left = left + 'px'
            target.style.top = top + 'px'

            if (typeof callback == 'function') {
                callback((parseInt(instance.left as never) || 0) + disX, (parseInt(instance.top as never) || 0) + disY)
            }

            if (event.preventDefault) {
                event.preventDefault()
            }
            return false
        }
    }
}
