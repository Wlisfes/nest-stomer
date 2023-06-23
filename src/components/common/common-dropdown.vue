<script lang="tsx">
import { defineComponent, computed, type PropType } from 'vue'
import { type DropdownOption } from 'naive-ui'

export default defineComponent({
    name: 'CommonDropdown',
    props: {
        showArrow: { type: Boolean, default: true },
        trigger: { type: String as PropType<'hover' | 'click' | 'focus' | 'manual'>, default: 'click' },
        command: { type: Array as PropType<Array<unknown>>, default: () => [] }
    },
    setup(props) {
        const dataCommand = []
        return (
            <n-dropdown trigger={props.trigger} placement="top" show-arrow={props.showArrow}>
                <n-button>找个地方休息</n-button>
            </n-dropdown>
        )
    }
})
</script>
