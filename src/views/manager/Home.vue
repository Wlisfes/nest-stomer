<script lang="tsx">
import { defineComponent } from 'vue'
import { router } from '@/router'

export default defineComponent({
    name: 'MHome',
    setup() {
        return () => (
            <main>
                Home
                <n-button type="success" onClick={() => router.push('/manager/system')}>
                    Success
                </n-button>
            </main>
        )
    }
})
</script>
