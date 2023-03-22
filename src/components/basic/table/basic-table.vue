<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'BasicTable',
    setup(props, ctx) {
        return () => {
            return (
                <u-container class="basic-table">
                    <n-space wrap-item={false}>
                        <n-button type="primary">Oops!</n-button>
                        <div style={{ flex: 1 }}></div>
                        {Array.from({ length: 10 }, x => (
                            <n-button type="primary">Oops</n-button>
                        ))}
                    </n-space>
                </u-container>
            )
        }
    }
})
</script>

<style lang="scss" scoped>
.basic-table {
    position: relative;
    .n-toolbar {
        display: flex;
        flex-wrap: wrap;
    }
}
</style>
