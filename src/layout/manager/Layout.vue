<script lang="tsx">
import { defineComponent, Transition, VNode, createVNode, computed, CSSProperties } from 'vue'
import { RouterView } from 'vue-router'
import { useManager } from '@/store/manager'
import { useProvider } from '@/hooks/hook-provider'

export default defineComponent({
    name: 'ALayout',
    setup() {
        const { vars, inverted } = useProvider()

        const store = useManager()
        const mobile = computed(() => store.device === 'MOBILE')
        const native = computed<CSSProperties>(() => {
            return {
                top: store.better ? '106px' : '60px',
                backgroundColor: vars.value.backColor
            }
        })

        return () => (
            <n-layout class="app-manager" has-sider>
                <n-layout-sider
                    bordered
                    collapsed={store.collapse}
                    width={220}
                    collapsed-width={mobile.value ? 0 : 64}
                    native-scrollbar={false}
                    show-trigger={mobile.value ? false : 'bar'}
                    collapse-mode="width"
                    expanded-keys={[]}
                    onUpdateCollapsed={() => store.setCollapse(!store.collapse)}
                ></n-layout-sider>
                <n-layout>
                    <n-layout-header class="app-manager__header" bordered inverted={inverted.value.header}>
                        Header
                    </n-layout-header>
                    <n-layout
                        class="app-manager__container"
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
.app-manager {
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
