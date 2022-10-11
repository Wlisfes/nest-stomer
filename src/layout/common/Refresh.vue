<script lang="tsx">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
    name: 'Refresh',
    beforeRouteEnter(to: any, from, next) {
        next(vm => vm.$router.replace(to.query.target))
    },
    setup() {
        const route = useRoute()
        return () => {
            return route.query.refresh ? null : <div>404</div>
        }
    }
})
</script>
