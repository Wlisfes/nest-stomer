<script lang="tsx">
import { defineComponent, computed, CSSProperties, PropType } from 'vue'

export default defineComponent({
    name: 'GlobalLayout',
    props: {
        wrap: {
            type: Boolean,
            default: true
        },
        min: {
            type: Number,
            required: true
        },
        space: {
            type: String,
            default: '8px 0'
        }
    },
    setup(props, { slots }) {
        const style = computed<CSSProperties>(() => ({
            minWidth: props.min + 'px',
            gap: props.space
        }))

        return () => (
            <div class={{ 'global-layout': true, 'is-wrap': props.wrap }} style={style.value}>
                {slots.default?.()}
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.global-layout {
    display: flex;
    &.is-wrap {
        flex-wrap: wrap;
    }
}
</style>
