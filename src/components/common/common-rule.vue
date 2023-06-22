<script lang="tsx">
import { defineComponent, computed, Fragment, type PropType } from 'vue'
import { type IRule } from '@/api/http-route'

export default defineComponent({
    name: 'CommonRule',
    props: {
        node: {
            type: Object as PropType<IRule>
        }
    },
    setup(props) {
        const type = computed(() => {
            switch (props.node?.method) {
                case 'GET':
                    return 'info'
                case 'POST':
                    return 'success'
                case 'PUT':
                    return 'warning'
                case 'DELETE':
                    return 'error'
                default:
                    return 'info'
            }
        })
        return () => (
            <n-button class="common-rule" tag="div" focusable={false} secondary size="large" type={type.value} bordered>
                <n-button type={type.value} size="small" strong>
                    {props.node?.method}
                </n-button>
                <n-h4 class="rule-path">{props.node?.path}</n-h4>
            </n-button>
        )
    }
})
</script>

<style lang="scss" scoped>
.n-button.common-rule {
    position: relative;
    display: flex;
    justify-content: flex-start;
    box-sizing: border-box;
    padding: 5px;

    &:hover {
        background-color: var(--n-color);
    }
    &.n-button--info-type {
        border: 1px solid var(--info-color);
    }
    &.n-button--success-type {
        border: 1px solid var(--success-color);
    }
    &.n-button--warning-type {
        border: 1px solid var(--warning-color);
    }
    &.n-button--error-type {
        border: 1px solid var(--error-color);
    }

    .rule-path {
        margin: 0 0 0 10px;
        line-height: var(--height-small);
    }
}
</style>
