<script lang="tsx">
import { defineComponent, computed } from 'vue'

export default defineComponent({
    name: 'ManagerLayout',
    setup() {
        return () => <n-layout class="manager-layout" has-sider></n-layout>
    }
})
</script>

<style lang="scss" scoped></style>
