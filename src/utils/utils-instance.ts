import { Observer } from '@/utils/utils-observer'
import { useManager } from '@/store/manager'

class Instance {
    protected static instance: Instance
    public readonly observer = new Observer()
    public readonly manager = useManager()

    constructor() {
        this.resize().finally(() => this.onResize())
    }

    public static getInstance(): Instance {
        if (!Instance.instance) {
            Instance.instance = new Instance()
        }
        return Instance.instance
    }

    private async resize() {
        const width = document.body.getBoundingClientRect().width
        if (width > 1080) {
            this.manager.setDevice('PC')
            this.manager.setCollapse(false)
            this.observer.emit('resize', { width, device: 'PC', collapse: false })
        } else if (width > 768) {
            this.manager.setDevice('IPAD')
            this.manager.setCollapse(true)
            this.observer.emit('resize', { width, device: 'IPAD', collapse: true })
        } else {
            this.manager.setDevice('MOBILE')
            this.manager.setCollapse(true)
            this.observer.emit('resize', { width, device: 'MOBILE', collapse: false })
        }
        return this.manager.setWidth(width)
    }

    public async onResize() {
        return window.addEventListener('resize', this.resize.bind(this))
    }

    public async offResize() {
        return window.removeEventListener('resize', this.resize.bind(this))
    }
}

export type NInstance = Instance

export function useInstance() {
    return Instance.getInstance()
}
