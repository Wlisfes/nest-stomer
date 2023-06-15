<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CommonTable',
    props: {
        width: {
            type: Number,
            default: 640
        }
    },
    setup(props, { slots }) {
        return () => (
            <n-el tag="div" class="common-table">
                {slots.default?.()}
            </n-el>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-table {
    position: relative;
    display: flex;
    background-color: var(--card-color);
}
</style>
