<script lang="tsx">
import { defineComponent, computed, Fragment, createVNode, type PropType } from 'vue'
import { type DropdownOption } from 'naive-ui'
import { useCurrent } from '@/locale/instance'
import { sompute } from '@/utils/utils-remix'

export default defineComponent({
    name: 'CommonDropdown',
    props: {
        showArrow: { type: Boolean, default: true },
        trigger: { type: String as PropType<'hover' | 'click' | 'focus' | 'manual'>, default: 'click' },
        command: { type: Array as PropType<Array<'create' | 'update' | 'delete' | 'disable' | 'enable'>>, default: () => [] },
        placement: { type: String, default: 'top' }
    },
    emits: ['selecter'],
    setup(props, { slots, emit }) {
        const { t } = useCurrent()
        const dataSource = computed<Array<DropdownOption>>(() => [
            { label: t('common.create.value'), key: 'create' },
            { label: t('common.update.value'), key: 'update' },
            { label: t('common.delete.value'), key: 'delete' },
            { label: t('common.disable.value'), key: 'disable' },
            { label: t('common.enable.value'), key: 'enable' }
        ])
        const dataColumn = computed(() => dataSource.value.filter(x => props.command.includes(x.key as never)))

        /**批处理图标渲染**/
        function createRemix(option: DropdownOption) {
            switch (option.key) {
                case 'create':
                    return createVNode(<common-remix type="primary" hover={false} icon={sompute('AddBold')}></common-remix>)
                case 'update':
                    return createVNode(<common-remix type="info" hover={false} icon={sompute('RadixEdit')}></common-remix>)
                case 'delete':
                    return createVNode(<common-remix type="error" hover={false} icon={sompute('DeleteBold')}></common-remix>)
                case 'disable':
                    return createVNode(<common-remix type="warning" hover={false} icon={sompute('DisableBold')}></common-remix>)
                case 'enable':
                    return createVNode(<common-remix type="success" hover={false} icon={sompute('EnableBold')}></common-remix>)
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
