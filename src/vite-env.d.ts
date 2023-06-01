/// <reference types="vite/client" />
import { CookieStorage } from '@/utils/utils-cookie'
import { Layout } from '@/utils/utils-layout'

declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const Component: DefineComponent<{}, {}, any>
    export default Component
}

declare module '*.module.scss' {
    const scssModule: { readonly [key: string]: string }
    export default scssModule
}

interface ImportMetaEnv {
    readonly VITE_PORT: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

declare global {
    interface Window {
        $cookie: CookieStorage
        $message: MessageApiInjection
        $loading: LoadingBarInst
        $notification: NotificationApiInjection
        $dialog: DialogApiInjection
        $layout: Layout
        AliyunUpload: {
            Vod: new (option) => any
        }
    }
}
