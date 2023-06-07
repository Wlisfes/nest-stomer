<script lang="tsx">
import { defineComponent, computed, type CSSProperties, type PropType } from 'vue'
import { useState } from '@/hooks/hook-state'

export default defineComponent({
    name: 'CommonSpin',
    props: {
        size: { type: String, default: 'small' }
    },
    setup(props, { emit, slots }) {
        const { state, setState } = useState({ loading: false })

        function onCompute() {
            setState({ loading: true })
        }

        return () => (
            <n-spin show={state.loading} size={props.size} onClick={(e: Event) => onCompute()}>
                {{ default: slots.default }}
            </n-spin>
        )
    }
})
</script>
