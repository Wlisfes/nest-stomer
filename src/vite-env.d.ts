/// <reference types="vite/client" />

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
