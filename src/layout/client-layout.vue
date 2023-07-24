<script lang="tsx">
import { defineComponent, computed } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
    name: 'ClientLayout',
    setup() {
        return () => (
            <n-layout class="client-layout" has-sider>
                <RouterView></RouterView>
            </n-layout>
        )
    }
})
</script>

<style lang="scss" scoped>
.client-layout {
    height: 100%;
}
</style>
