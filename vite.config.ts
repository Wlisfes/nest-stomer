import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
    const root = process.cwd()
    const env = loadEnv(mode, root)

    return {
        plugins: [
            vue(),
            vueJsx(),
            AutoImport({
                resolvers: [NaiveUiResolver()]
            }),
            Components({
                dts: true,
                dirs: ['src/components'],
                resolvers: [NaiveUiResolver()],
                include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/, /\.tsx\?tsx/]
            })
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
                // 'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
            }
        },
        css: {
            modules: {
                generateScopedName: '[local]___[hash:5]',
                localsConvention: 'camelCase'
            }
        },
        server: {
            port: Number(env.VITE_PORT),
            open: true,
            host: '0.0.0.0',
            proxy: {
                [env.VITE_API_BASE]: {
                    target: env.VITE_API_BASE_TARGET,
                    ws: true,
                    changeOrigin: true,
                    rewrite: path => path.replace(new RegExp(`^${env.VITE_API_BASE}`), '')
                }
            }
        }
    }
})
