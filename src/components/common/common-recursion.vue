<script lang="tsx">
import { defineComponent, Fragment, type PropType } from 'vue'
import { type Scheme } from '@/interface/http-interface'
interface DataSource extends Scheme, Record<string, unknown> {
    children: DataSource[]
}

export default defineComponent({
    name: 'CommonRecursion',
    props: {
        dataSource: {
            type: Array as PropType<Array<DataSource>>,
            default: () => []
        }
    },
    setup(props, { slots }) {
        return () => (
            <div class="common-recursion">
                {props.dataSource.map((item, index) => {
                    return <Fragment>{slots.default ? slots.default(item, slots) : null}</Fragment>
                })}
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-recursion {
    position: relative;
}
</style>
