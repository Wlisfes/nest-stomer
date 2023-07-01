<script lang="tsx">
import { defineComponent, computed, Fragment, type PropType } from 'vue'
import { useCurrent } from '@/locale/instance'

export default defineComponent({
    name: 'CommonMode',
    props: {
        value: {
            type: String as PropType<'enable' | 'disable' | 'delete'>,
            default: 'enable'
        },
        size: {
            type: String as PropType<'small' | 'medium' | 'large'>,
            default: 'small'
        }
    },
    setup(props) {
        const { tm } = useCurrent()
        const content = computed(() => {
            const modeColumn = tm<Array<{ label: string; value: unknown; enter: string }>>('common.status.column')
            const node = modeColumn.find(x => x.value === props.value)
            return node?.label ?? '--'
        })

        return () => (
            <Fragment>
                {props.value === 'enable' ? (
                    <n-tag bordered={false} size={props.size} type="success">
                        {content.value}
                    </n-tag>
                ) : props.value === 'disable' ? (
                    <n-tag bordered={false} size={props.size} type="warning">
                        {content.value}
                    </n-tag>
                ) : props.value === 'delete' ? (
                    <n-tag bordered={false} size={props.size} type="error">
                        {content.value}
                    </n-tag>
                ) : null}
            </Fragment>
        )
    }
})
</script>
