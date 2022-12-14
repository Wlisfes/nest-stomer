<script lang="tsx">
import { defineComponent, computed, CSSProperties } from 'vue'
import { RouterView } from 'vue-router'
import { NBetter } from '@/layout/common'
import { useManager } from '@/store/manager'
import { useProvider } from '@/hooks/hook-provider'
import { useRxicon } from '@/hooks/hook-icon'
import { fetchSettin } from '@/components/core'

export default defineComponent({
    name: 'ALayout',
    setup() {
        const { vars, inverted } = useProvider()
        const { Icon, compute } = useRxicon()
        const manager = useManager()
        const mobile = computed(() => manager.device === 'MOBILE')
        const native = computed<CSSProperties>(() => {
            return {
                top: manager.better ? '106px' : '60px',
                backgroundColor: vars.value.backColor
            }
        })

        return () => (
            <n-layout class="app-manager" has-sider>
                <n-layout-sider
                    bordered
                    collapsed={manager.collapse}
                    inverted={inverted.value.sider}
                    width={220}
                    collapsed-width={mobile.value ? 0 : 64}
                    native-scrollbar={false}
                    show-trigger={mobile.value ? false : 'bar'}
                    collapse-mode="width"
                    expanded-keys={[]}
                    onUpdateCollapsed={() => manager.setCollapse(!manager.collapse)}
                >
                    <n-menu
                        accordion
                        inverted={inverted.value.sider}
                        root-indent={18}
                        value={manager.current}
                        collapsed={manager.collapse}
                        collapsed-width={64}
                        options={manager.menu}
                    />
                </n-layout-sider>
                <n-layout>
                    <n-layout-header class="app-manager__header" bordered inverted={inverted.value.header}>
                        <div style={{ flex: 1 }}></div>
                        <div class="n-trigger" onClick={fetchSettin}>
                            <Icon size={20} component={compute('SettingOutlined')} />
                        </div>
                    </n-layout-header>
                    {manager.better && <NBetter></NBetter>}
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
        padding: 0 10px 0 20px;
        display: flex;
        .n-trigger {
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            position: relative;
            padding: 0 10px;
        }
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
