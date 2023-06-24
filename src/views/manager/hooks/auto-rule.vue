<script lang="tsx">
import { defineComponent, onMounted, type PropType } from 'vue'
import { Observer } from '@/utils/utils-observer'
import { useState } from '@/hooks/hook-state'

export default defineComponent({
    name: 'AutoRule',
    props: {
        observer: {
            type: Object as PropType<Observer<Record<string, unknown>>>,
            required: true
        }
    },
    emits: ['unmount'],
    setup(props, { emit }) {
        const { state, setState } = useState({
            visible: false
        })

        onMounted(() => {
            setState({ visible: true })
        })

        return () => (
            <n-modal
                v-model:show={state.visible}
                auto-focus={false}
                show-icon={false}
                preset="dialog"
                style={{ width: '640px' }}
                onAfterLeave={() => emit('unmount')}
            ></n-modal>
        )
    }
})
</script>
