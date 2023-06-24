<script lang="tsx">
import { defineComponent, type PropType } from 'vue'
import { Observer } from '@/utils/utils-observer'
import { useCustomize } from '@/hooks/hook-customize'
import { useCurrent } from '@/locale/instance'

export default defineComponent({
    name: 'AutoRule',
    props: {
        observer: { type: Object as PropType<Observer<Record<string, unknown>>>, required: true },
        title: { type: Boolean }
    },
    emits: ['unmount'],
    setup(props, { emit }) {
        const { t } = useCurrent()
        const { formRef, state, setState } = useCustomize(
            {
                immediate: true,
                loading: true,
                visible: false,
                form: {},
                rules: {}
            },
            () => setState({ visible: true })
        )

        function onSubmit() {}

        return () => (
            <n-modal
                v-model:show={state.visible}
                auto-focus={false}
                show-icon={false}
                mask-closable={false}
                title={t('common.update.enter', { name: '1111111' })}
                preset="dialog"
                style={{ width: '640px' }}
                onAfterLeave={() => emit('unmount')}
                action={() => (
                    <n-space justify="center" style={{ flex: 'auto' }}>
                        <n-button class="el-customize el-medium" onClick={() => setState({ visible: false })}>
                            {t('common.cancel.value')}
                        </n-button>
                        <n-button
                            class="el-customize el-medium"
                            type="primary"
                            disabled={state.loading}
                            loading={state.loading}
                            onClick={onSubmit}
                        >
                            {t('common.submit.value')}
                        </n-button>
                    </n-space>
                )}
            >
                <n-form
                    ref={formRef}
                    model={state.form}
                    rules={state.rules}
                    disabled={state.loading}
                    label-placement="left"
                    require-mark-placement="left"
                    label-width="120px"
                ></n-form>
            </n-modal>
        )
    }
})
</script>
