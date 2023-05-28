<script lang="tsx">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
    name: 'App',
    setup() {
        return () => (
            <common-provider>
                <RouterView></RouterView>
            </common-provider>
        )
    }
})
</script>
