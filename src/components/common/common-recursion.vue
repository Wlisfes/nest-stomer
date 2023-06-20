<script lang="tsx">
import { defineComponent, Fragment, type PropType } from 'vue'
import { type Scheme } from '@/api/http-interface'
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
                {props.dataSource.map(item => {
                    return (
                        <Fragment>
                            {slots.default ? slots.default(item) : null}
                            {item.children.length > 0 && <common-recursion data-source={item.children}>{slots}</common-recursion>}
                        </Fragment>
                    )
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
