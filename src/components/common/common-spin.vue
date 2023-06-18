<script lang="tsx">
import { defineComponent, onMounted, toRefs, Fragment } from 'vue'
import { useState } from '@/hooks/hook-state'
import { divineDelay } from '@/utils/utils-common'

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

        async function done(value: boolean, delay: number = 0) {
            await divineDelay(delay)
            return await setState({ loading: value })
        }

        /**开启loading**/
        function onCompute() {
            if (!state.loading && !props.disabled) {
                emit('compute', { done })
            }
        }

        return () => (
            <n-spin
                class={{ 'common-spin': true, 'is-disabled': props.disabled || state.loading }}
                show={state.loading}
                size={props.size}
                onClick={(e: Event) => onCompute()}
            >
                {{ default: () => <Fragment>{slots.default?.({ ...toRefs(state), done })}</Fragment> }}
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
