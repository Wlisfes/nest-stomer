import { Observer } from '@/utils/utils-observer'
import { useManager } from '@/store/manager'

export class Layout {
    private static instance: Layout
    public readonly observer = new Observer()
    public readonly store = useManager()
    constructor() {
        this.resize().finally(() => this.onResize())
        if (!Layout.instance) {
            Layout.instance = this
        }
        return Layout.instance
    }

    private async resize() {
        const width = document.body.getBoundingClientRect().width
        if (width > 1080) {
            this.store.setDevice('PC')
            this.store.setCollapse(false)
            this.observer.emit('resize', { width, device: 'PC', collapse: false })
        } else if (width > 768) {
            this.store.setDevice('IPAD')
            this.store.setCollapse(true)
            this.observer.emit('resize', { width, device: 'IPAD', collapse: true })
        } else {
            this.store.setDevice('MOBILE')
            this.store.setCollapse(true)
            this.observer.emit('resize', { width, device: 'MOBILE', collapse: false })
        }
        return this.store.setWidth(width)
    }

    public async onResize() {
        return window.addEventListener('resize', this.resize.bind(this))
    }

    public async offResize() {
        return window.removeEventListener('resize', this.resize.bind(this))
    }
}
