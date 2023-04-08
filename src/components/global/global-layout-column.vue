<script lang="tsx">
import { defineComponent, computed, CSSProperties, PropType } from 'vue'

export default defineComponent({
    name: 'GlobalLayoutColumn',
    props: {
        min: {
            type: Number,
            required: true
        },
        width: {
            type: Number,
            required: true
        }
    },
    setup(props, { slots }) {
        const style = computed<CSSProperties>(() => ({
            minWidth: props.width + 'px',
            width: ((props.width / props.min) * 100).toFixed(6) + '%'
        }))

        return () => (
            <div class="global-layout__column" style={style.value}>
                <div class="layout-docker">{slots.default?.()}</div>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.global-layout__column {
    box-sizing: border-box;
    padding: 0 6px;
    .layout-docker {
        display: flex;
        flex-direction: column;
        background-color: #e0e0e0;
    }
}
</style>
