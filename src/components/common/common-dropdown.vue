<script lang="tsx">
import { defineComponent, computed, Fragment, createVNode, type PropType } from 'vue'
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
    emits: ['selecter'],
    setup(props, { slots, emit }) {
        const { t } = useCurrent()
        const dataSource = computed<Array<DropdownOption>>(() => [
            { label: t('common.create.value'), key: 'create' },
            { label: t('common.update.value'), key: 'update' },
            { label: t('common.delete.value'), key: 'delete' }
        ])
        const dataColumn = computed(() => dataSource.value.filter(x => props.command.includes(x.key as never)))

        /**批处理图标渲染**/
        function createRemix(option: DropdownOption) {
            switch (option.key) {
                case 'create':
                    return createVNode(<n-icon component={<Icon-AddBold />}></n-icon>)
                case 'update':
                    return createVNode(<n-icon component={<Icon-RadixEdit />}></n-icon>)
                case 'delete':
                    return createVNode(<n-icon component={<Icon-CloseBold />}></n-icon>)
            }
        }

        /**选中时回调**/
        function onSelecter(key: typeof props.command, option: DropdownOption) {
            emit('selecter', key)
        }

        return () => (
            <n-dropdown
                trigger={props.trigger}
                options={dataColumn.value}
                placement={props.placement}
                show-arrow={props.showArrow}
                render-icon={createRemix}
                on-select={onSelecter}
            >
                {{ default: () => <Fragment>{slots.default?.()}</Fragment> }}
            </n-dropdown>
        )
    }
})
</script>
