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
        return () => <div class="common-table">{slots.default?.()}</div>
    }
})
</script>

<style lang="scss" scoped>
.common-table {
    position: relative;
    display: flex;
}
</style>
