<script lang="tsx">
import { defineComponent, onMounted, type PropType } from 'vue'
import { Observer } from '@/utils/utils-observer'
import { useState } from '@/hooks/hook-state'
import { useCurrent } from '@/locale/instance'

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
        const { t } = useCurrent()
        const { state, setState } = useState({
            loading: true,
            visible: false
        })

        function onSubmit() {}

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
                action={() => (
                    <n-space justify="center">
                        <n-button onClick={() => setState({ visible: false })}>{t('common.cancel.value')}</n-button>
                        <n-button type="primary" disabled={state.loading} loading={state.loading} onClick={onSubmit}>
                            {t('common.submit.value')}
                        </n-button>
                    </n-space>
                )}
            ></n-modal>
        )
    }
})
</script>
