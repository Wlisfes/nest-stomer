<script lang="tsx">
import { defineComponent } from 'vue'
import { router } from '@/router'
import { AppContainer } from '@/components/global'

export default defineComponent({
    name: 'MRouter',
    setup() {
        return () => <AppContainer>MRouter</AppContainer>
    }
})
</script>
