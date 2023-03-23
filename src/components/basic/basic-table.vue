<script lang="tsx">
import { defineComponent, Fragment } from 'vue'

export default defineComponent({
    name: 'BasicTable',
    setup(props, { slots }) {
        console.log(slots)
        return () => {
            return (
                <u-container class="basic-table">
                    <div class="basic-table__toolbar">
                        <div class="n-start">
                            <Fragment>{slots.start?.()}</Fragment>
                        </div>
                        <div class="n-end">
                            <n-space justify="end" size={[10, 8]}>
                                {Array.from({ length: 10 }, (n, x) => (
                                    <n-button type="primary">Oops! {x}</n-button>
                                ))}
                            </n-space>
                        </div>
                    </div>
                </u-container>
            )
        }
    }
})
</script>

<style lang="scss" scoped>
.basic-table {
    position: relative;
}
</style>
