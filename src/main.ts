import '@/style/index.scss'
import App from '@/App.vue'
import { createComponent } from '@/utils/utils-app'

async function bootstrap() {
    const { app } = createComponent(App)

    app.mount('#app')
}
bootstrap()
