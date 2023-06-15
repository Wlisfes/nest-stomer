<script lang="tsx">
import { defineComponent } from 'vue'
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'

export default defineComponent({
    name: 'CommonCollapse',
    components: { CollapseTransition },
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { slots }) {
        return () => (
            <collapse-transition>
                {{
                    default: () => {
                        return props.visible && slots.default ? slots.default(props) : null
                    }
                }}
            </collapse-transition>
        )
    }
})
</script>
