<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CommonLayoutColumn',
    setup(props, { slots }) {
        return () => <div class="common-layout__column">{slots.default?.()}</div>
    }
})
</script>

<style lang="scss" scoped>
.common-layout__column {
    position: relative;
}
</style>
