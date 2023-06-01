<script lang="tsx">
import { defineComponent, computed } from 'vue'
import { useManager } from '@/store/manager'

export default defineComponent({
    name: 'ManagerLayout',
    setup() {
        const store = useManager()

        return () => (
            <n-layout class="manager-layout" has-sider>
                <n-layout-sider bordered>
                    <n-menu
                        accordion
                        root-indent={18}
                        value={store.current}
                        collapsed={store.collapse}
                        collapsed-width={64}
                        options={store.menu}
                    />
                </n-layout-sider>
                <n-layout>
                    <n-layout-header class="manager-layout__header" bordered>
                        1
                    </n-layout-header>
                    <n-layout class="manager-layout__container" position="absolute" native-scrollbar={false}>
                        2
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
