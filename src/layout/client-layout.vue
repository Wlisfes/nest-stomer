<script lang="tsx">
import { defineComponent, computed } from 'vue'

export default defineComponent({
    name: 'ClientLayout',
    setup() {
        return () => <n-layout class="client-layout" has-sider></n-layout>
    }
})
</script>

<style lang="scss" scoped></style>
