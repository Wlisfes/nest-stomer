<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CommonCollapse',
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        appear: {
            type: Boolean
        }
    },
    setup(props, { slots }) {
        return () => (
            <n-collapse-transition appear={props.appear} show={props.visible}>
                {{ default: slots.default }}
            </n-collapse-transition>
        )
    }
})
</script>
