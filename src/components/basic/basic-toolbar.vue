<script lang="tsx">
import { defineComponent, Fragment } from 'vue'

export default defineComponent({
    name: 'BasicToolbar',
    render() {
        return () => (
            <div class="basic-toolbar">
                <Fragment class="kkk">
                    {Array.from({ length: 10 }, (n, x) => (
                        <n-button type="primary">Oops! {x}</n-button>
                    ))}
                </Fragment>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.basic-toolbar {
    position: relative;
    overflow: hidden;
}
</style>
