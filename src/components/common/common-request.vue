<script lang="tsx">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
    name: 'CommonRequest',
    props: {
        cols: { type: Object as PropType<Record<number, number>>, default: () => ({}) },
        defaultCols: { type: Number, default: 3 },
        xGap: { type: Number, default: 12 },
        xYap: { type: Number, default: 12 }
    },
    emits: ['mounte'],
    setup(props, { slots, emit }) {
        return () => (
            <section class="common-request">
                <n-form show-label={false} show-feedback={false} size="large" style={{ padding: '16px' }}>
                    <n-grid cols={props.defaultCols} item-responsive x-gap={props.xGap} y-gap={props.xYap}>
                        {slots.default?.()}
                    </n-grid>
                </n-form>
            </section>
        )
    }
})
</script>
