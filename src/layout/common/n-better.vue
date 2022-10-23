<script lang="tsx">
import { defineComponent, onMounted, ref, watch, nextTick, computed } from 'vue'

export default defineComponent({
    name: 'NBetter',
    setup() {
        return () => <n-el tag="div" class="n-better"></n-el>
    }
})
</script>

<style lang="scss" scoped>
.n-better {
    display: flex;
    align-items: center;
    position: relative;
    background-color: var(--back-color);
    padding: 8px 12px;
    height: 30px;
}
</style>
