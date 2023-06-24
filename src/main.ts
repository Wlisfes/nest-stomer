import '@/style/index.scss'
import App from '@/App.vue'
import { createBootstrap } from '@/utils/utils-app'

async function bootstrap() {
    const { app } = createBootstrap(App)

    app.mount('#app')
}
bootstrap()
