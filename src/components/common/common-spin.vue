<script lang="tsx">
import { defineComponent, onMounted, type CSSProperties, type PropType } from 'vue'
import { useState } from '@/hooks/hook-state'

export default defineComponent({
    name: 'CommonSpin',
    props: {
        runtime: { type: Boolean },
        disabled: { type: Boolean },
        size: { type: String, default: 'small' }
    },
    emits: ['compute'],
    setup(props, { emit, slots }) {
        const { state, setState } = useState({ loading: false })
        onMounted(() => {
            if (props.runtime) {
                onCompute()
            }
        })

        /**开启loading**/
        function onCompute() {
            if (!state.loading && !props.disabled) {
                emit('compute', {
                    done: (value: boolean) => setState({ loading: value })
                })
            }
        }

        return () => (
            <n-spin
                class={{ 'common-spin': true, 'is-disabled': props.disabled || state.loading }}
                show={state.loading}
                size={props.size}
                onClick={(e: Event) => onCompute()}
            >
                {{ default: slots.default }}
            </n-spin>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-spin {
    &.is-disabled {
        cursor: not-allowed;
        opacity: 0.3;
    }
}
</style>
