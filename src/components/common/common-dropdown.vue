<script lang="tsx">
import { defineComponent, computed, Fragment, type PropType } from 'vue'
import { type DropdownOption } from 'naive-ui'
import { useCurrent } from '@/locale/instance'

export default defineComponent({
    name: 'CommonDropdown',
    props: {
        showArrow: { type: Boolean, default: true },
        trigger: { type: String as PropType<'hover' | 'click' | 'focus' | 'manual'>, default: 'click' },
        command: { type: Array as PropType<Array<'create' | 'update' | 'delete'>>, default: () => [] },
        placement: { type: String, default: 'top' }
    },
    setup(props, { slots }) {
        const { t } = useCurrent()
        const dataSource = computed<Array<DropdownOption>>(() => [
            { label: t('common.create.title'), key: 'create' },
            { label: t('common.update.title'), key: 'update' },
            { label: t('common.delete.title'), key: 'delete' }
        ])
        const dataColumn = computed(() => dataSource.value.filter(x => props.command.includes(x.key as never)))

        return (
            <n-dropdown trigger={props.trigger} options={dataColumn.value} placement={props.placement} show-arrow={props.showArrow}>
                {{ default: () => <Fragment>{slots.default?.()}</Fragment> }}
            </n-dropdown>
        )
    }
})
</script>
