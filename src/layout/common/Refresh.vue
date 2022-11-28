<script lang="tsx">
import { defineComponent, computed, CSSProperties } from 'vue'
import { useRoute } from 'vue-router'
import { useProvider } from '@/hooks/hook-provider'

export default defineComponent({
    name: 'Refresh',
    beforeRouteEnter(to: any, from, next) {
        next(vm => vm.$router.replace(to.query.target))
    },
    setup() {
        const route = useRoute()
        const { vars } = useProvider()
        const style = computed<CSSProperties>(() => ({
            width: '100%',
            height: '100%',
            backgroundColor: vars.value.cardColor
        }))

        return () => {
            return route.name === '404' ? (
                <u-container style={style.value}>404</u-container>
            ) : (
                <u-container style={style.value}>
                    <div id="loading-mask" style={{ background: 'transparent' }}>
                        <div class="loading-wrapper">
                            <span class="loading-dot loading-dot-spin">
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                            </span>
                        </div>
                    </div>
                </u-container>
            )
        }
    }
})
</script>
