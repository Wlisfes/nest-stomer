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
            return route.name === '404' ? (
                <div>404</div>
            ) : (
                <div id="loading-mask">
                    <div class="loading-wrapper">
                        <span class="loading-dot loading-dot-spin">
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                        </span>
                    </div>
                </div>
            )
        }
    }
})
</script>
