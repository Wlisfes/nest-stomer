<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Route',
    setup() {
        return () => (
            <common-container>
                {{
                    toolbar: () => <h1 slot="toolbar">Route</h1>
                }}
            </common-container>
        )
    }
})
</script>
