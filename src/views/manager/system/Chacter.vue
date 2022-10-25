<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Chacter',
    setup() {
        return () => (
            <u-container>
                <n-layout position="absolute" has-sider>
                    <n-layout-sider native-scrollbar={false} bordered></n-layout-sider>
                    <n-layout native-scrollbar={false}></n-layout>
                </n-layout>
            </u-container>
        )
    }
})
</script>
