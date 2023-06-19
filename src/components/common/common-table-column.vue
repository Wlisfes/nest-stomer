<script lang="tsx">
import { defineComponent, computed, type CSSProperties, type PropType } from 'vue'

export default defineComponent({
    name: 'CommonTableColumn',
    props: {
        title: { type: String },
        content: { type: String },
        width: {
            type: Number,
            default: 640
        },
        minWidth: {
            type: Number,
            default: 0
        },
        columnStyle: {
            type: Object as PropType<CSSProperties>,
            default: () => ({})
        }
    },
    setup(props, { slots }) {
        const cameStyle = computed<CSSProperties>(() => ({
            ...props.columnStyle,
            minWidth: props.minWidth + 'px',
            width: Math.floor((props.minWidth / props.width) * 1000000) / 10000 + '%'
        }))

        return () => (
            <div class="common-table__column" style={cameStyle.value}>
                <div class="common-table__column__content">
                    {slots.default ? (
                        slots.default(props)
                    ) : props.title ? (
                        <n-h4 style={{ margin: 0 }}>{props.title}</n-h4>
                    ) : props.content ? (
                        <n-text>{props.content}</n-text>
                    ) : null}
                </div>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-table__column {
    position: relative;
    box-sizing: border-box;
    padding: 0 8px;
    &__content {
        position: relative;
        display: flex;
        flex-direction: column;
        line-height: 24px;
    }
}
</style>
