<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CommonTableColumn',
    props: {
        title: { type: String },
        content: { type: String }
    },
    setup(props, { slots }) {
        return () => (
            <div class="common-table__column">
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
