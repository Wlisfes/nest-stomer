<script lang="tsx">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { Layout } from '@/utils/utils-layout'

export default defineComponent({
    name: 'App',
    setup() {
        window.$layout = new Layout()

        return () => (
            <common-provider>
                <RouterView></RouterView>
            </common-provider>
        )
    }
})
</script>
