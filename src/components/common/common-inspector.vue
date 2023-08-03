<script lang="tsx">
import { defineComponent, type PropType } from 'vue'
import { useCurrent } from '@/locale/instance'

export default defineComponent({
    name: 'CommonInspector',
    props: {
        loading: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        cancel: { type: [String, Boolean] as PropType<string | boolean>, default: true },
        submit: { type: [String, Boolean] as PropType<string | boolean>, default: true }
    },
    emits: ['cancel', 'submit'],
    setup(props, { emit }) {
        const { t } = useCurrent()

        return () => (
            <n-space class="common-inspector" justify="center" style={{ flex: 'auto' }}>
                {props.cancel && (
                    <n-button class="el-customize el-medium" onClick={(e: Event) => emit('cancel', e)}>
                        {typeof props.cancel === 'boolean' ? t('common.cancel.value') : props.cancel}
                    </n-button>
                )}
                {props.submit && (
                    <n-button
                        class="el-customize el-medium"
                        type="primary"
                        disabled={props.disabled}
                        loading={props.loading}
                        onClick={(e: Event) => emit('submit', e)}
                    >
                        {typeof props.submit === 'boolean' ? t('common.submit.value') : props.submit}
                    </n-button>
                )}
            </n-space>
        )
    }
})
</script>
