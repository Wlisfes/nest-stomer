<script lang="tsx">
import { defineComponent, computed, type CSSProperties } from 'vue'
import { RouterView } from 'vue-router'
import { useManager } from '@/store/manager'
import { useProvider } from '@/hooks/hook-provider'

export default defineComponent({
    name: 'ManagerLayout',
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
            <n-layout class="manager-layout" has-sider>
                <n-layout-sider
                    bordered
                    collapsed={store.collapse}
                    inverted={inverted.value.sider}
                    width={240}
                    collapsed-width={mobile.value ? 0 : 64}
                    native-scrollbar={false}
                    show-trigger={mobile.value ? false : 'bar'}
                    collapse-mode="width"
                    expanded-keys={[]}
                    onUpdateCollapsed={() => store.setCollapse(!store.collapse)}
                >
                    <n-menu
                        accordion
                        inverted={inverted.value.sider}
                        root-indent={18}
                        value={store.current}
                        collapsed={store.collapse}
                        collapsed-width={64}
                        options={store.menu}
                    />
                </n-layout-sider>
                <n-layout>
                    <n-layout-header class="manager-layout__header" bordered inverted={inverted.value.sider}>
                        <n-button onClick={() => store.setTheme(store.theme === 'light' ? 'dark' : 'light')}>深色</n-button>
                    </n-layout-header>
                    <n-layout
                        class="manager-layout__container"
                        position="absolute"
                        style={native.value}
                        inverted={inverted.value.sider}
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
.manager-layout {
    height: 100%;
    &__header {
        height: 60px;
        padding: 0 10px 0 20px;
        display: flex;
    }
    &__container {
        top: 60px;
    }
}
</style>
