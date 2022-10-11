<script lang="tsx">
import { defineComponent, computed, CSSProperties } from 'vue'
import { RouterView } from 'vue-router'
import { useProvider } from '@/hooks/hook-provider'

export default defineComponent({
    name: 'CLayout',
    setup() {
        const { vars, inverted } = useProvider()
        const native = computed<CSSProperties>(() => {
            return {
                top: '60px',
                backgroundColor: vars.value.backColor
            }
        })

        return () => (
            <n-layout class="app-client" has-sider>
                <n-layout>
                    <n-layout-header class="app-client__header" bordered inverted={inverted.value.header}>
                        Header
                    </n-layout-header>
                    <n-layout
                        class="app-client__container"
                        position="absolute"
                        style={native.value}
                        native-scrollbar={false}
                    >
                        <RouterView></RouterView>
                    </n-layout>
                </n-layout>
            </n-layout>
        )
    }
})
</script>

<style lang="scss" scoped>
.app-client {
    height: 100%;
    &__header {
        height: 60px;
        padding: 0 20px;
        display: flex;
    }
    &__container {
        :deep(.n-scrollbar-content) {
            min-height: 100%;
            display: flex;
            flex-direction: column;
        }
    }
}
</style>
