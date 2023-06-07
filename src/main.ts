import '@/style/index.scss'

import App from './App.vue'
import { createApp } from 'vue'
import { setupI18n } from '@/locale/instance'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'

const app = createApp(App)

setupI18n(app)
setupStore(app)
setupRouter(app)

app.mount('#app')
