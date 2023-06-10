import { createApp, type DefineComponent } from 'vue'
import { setupI18n } from '@/locale/instance'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'

export function createComponent<R extends DefineComponent<{}, {}, any>, P extends Object>(RootComponent: R, props?: P) {
    const app = createApp(
        <common-provider>
            <RootComponent {...props}></RootComponent>
        </common-provider>
    )

    setupI18n(app)
    setupStore(app)
    setupRouter(app)

    return { app }
}
