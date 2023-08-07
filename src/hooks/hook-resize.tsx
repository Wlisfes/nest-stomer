import { ref, watch, computed } from 'vue'
import { useManager } from '@/store/manager'
import { useWindowSize, useElementSize } from '@vueuse/core'

export type IDevice = 'PC' | 'IPAD' | 'MOBILE'
export type IOption = {
    cols?: Record<number, number>
    defaultCols?: number
    onResize?: (e: { width: number; height: number; collapse: boolean; device: IDevice }) => void
    onDevice?: (device: IDevice) => void
    onCollapse?: (collapse: boolean) => void
}

export function useResize(option: IOption = {}) {
    const { width, height } = useWindowSize()
    const store = useManager()
    const cols = computed(() => {
        //prettier-ignore
        const screen = Object.keys(option.cols ?? {}).map(Number).sort((a, b) => a - b).find(value => width.value < value)
        return screen && option.cols ? option.cols[screen] : option.defaultCols ?? 3
    })

    function setDevice(device: IDevice) {
        store.setDevice(device)
        option?.onDevice?.(device)
    }

    function setCollapse(collapse: boolean) {
        store.setCollapse(collapse)
        option?.onCollapse?.(collapse)
    }

    function onResize() {
        if (width.value > 1080) {
            setDevice('PC')
            setCollapse(false)
        } else if (width.value > 768) {
            setDevice('IPAD')
            setCollapse(true)
        } else {
            setDevice('MOBILE')
            setCollapse(true)
        }
        return option?.onResize?.({
            width: width.value,
            height: height.value,
            collapse: store.collapse,
            device: store.device as IDevice
        })
    }

    watch(
        () => [width.value, height.value],
        () => onResize(),
        { immediate: true }
    )

    return {
        collapse: computed(() => store.collapse),
        device: computed(() => store.device as IDevice),
        width,
        height,
        cols
    }
}

export function useElementResize(option: any) {
    const element = ref<HTMLElement>()
    useElementSize

    setTimeout(() => {
        console.log(element.value)
    }, 500)
    return {
        element
    }
}
