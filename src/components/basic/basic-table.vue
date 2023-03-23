<script lang="tsx">
import { defineComponent, Fragment } from 'vue'

export default defineComponent({
    name: 'BasicTable',
    setup(props, { slots }) {
        // console.log(slots)
        return () => {
            return (
                <u-container class="basic-table">
                    <basic-toolbar>
                        {{
                            start: () => (
                                <Fragment>
                                    <n-button type="primary">Oops!</n-button>
                                    <n-button type="primary">Oops!</n-button>
                                </Fragment>
                            )
                        }}
                    </basic-toolbar>
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
