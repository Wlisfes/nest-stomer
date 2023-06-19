<script lang="tsx">
import { defineComponent, Fragment, type PropType } from 'vue'

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
        return () => (
            <Fragment>
                {props.value === 'enable' ? (
                    <n-tag bordered={false} size={props.size} type="success">
                        已启用
                    </n-tag>
                ) : props.value === 'disable' ? (
                    <n-tag bordered={false} size={props.size} type="warning">
                        已禁用
                    </n-tag>
                ) : props.value === 'delete' ? (
                    <n-tag bordered={false} size={props.size} type="error">
                        已删除
                    </n-tag>
                ) : null}
            </Fragment>
        )
    }
})
</script>
