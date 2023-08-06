<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CommonRequest',
    setup() {
        return () => (
            <n-el tag="div" class="common-request">
                <n-form show-label={false} show-feedback={false} size="large" style={{ padding: '16px' }}></n-form>
            </n-el>
        )
    }
})
</script>
