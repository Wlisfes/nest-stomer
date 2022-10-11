<script lang="tsx">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
    name: 'Refresh',
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.$router.replace(to.query.target as string)
        })
    },
    setup() {
        const route = useRoute()
        return () => {
            if (route.query.refresh) {
                return null
            }
            return <div>404</div>
        }
    }
})
</script>
