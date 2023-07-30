<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CommonContainer',
    props: {
        position: { type: String, default: 'absolute' }
    },
    setup(props, { slots }) {
        return () => (
            <section class={{ 'common-container': true, [`is-${props.position}`]: true }}>{slots.default ? slots.default() : null}</section>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-container {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    &.is-absolute {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
    &.is-static {
        position: relative;
        flex: 1;
    }
}
</style>
