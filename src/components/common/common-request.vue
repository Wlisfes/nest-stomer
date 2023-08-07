<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CommonRequest',
    props: {
        cols: { type: Number, default: 24 },
        xGap: { type: Number, default: 12 },
        xYap: { type: Number, default: 12 }
    },
    emits: ['mounte'],
    setup(props, { slots, emit }) {
        return () => (
            <section class="common-request">
                <n-form show-label={false} show-feedback={false} size="large" style={{ padding: '16px' }}>
                    <n-grid cols={props.cols} item-responsive x-gap={props.xGap} y-gap={props.xYap}>
                        {slots.default?.()}
                    </n-grid>
                </n-form>
            </section>
        )
    }
})
</script>
