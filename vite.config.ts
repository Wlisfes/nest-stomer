import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
    const root = process.cwd()
    const env = loadEnv(mode, root)

    return {
        plugins: [vue(), vueJsx()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
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
