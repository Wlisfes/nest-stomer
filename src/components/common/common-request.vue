<script lang="tsx">
import { defineComponent, ref, computed, watch, type PropType } from 'vue'
import { useElementSize } from '@vueuse/core'
import { divineCols } from '@/utils/utils-common'

export default defineComponent({
    name: 'CommonRequest',
    props: {
        cols: { type: Object as PropType<Record<number, number>>, default: () => ({}) },
        defaultCols: { type: Number, default: 24 },
        xGap: { type: Number, default: 12 },
        xYap: { type: Number, default: 12 }
    },
    emits: ['update', 'resize'],
    setup(props, { slots, emit }) {
        const element = ref<HTMLElement>()
        const { width, height } = useElementSize(element)
        const cols = computed(() => {
            return divineCols(props.cols ?? {}, width.value, props.defaultCols)
        })

        watch(
            () => [width.value, height.value],
            () => {
                emit('resize', { width: width.value, height: height.value, cols: cols.value })
            },
            { immediate: true }
        )

        return () => (
            <section ref={element} class="common-request">
                <n-form show-label={false} show-feedback={false} size="large" style={{ padding: '16px 16px' }}>
                    <n-grid cols={cols.value} item-responsive x-gap={props.xGap} y-gap={props.xYap}>
                        {slots.default?.({ width: width.value, height: height.value, cols: cols.value })}
                    </n-grid>
                </n-form>
            </section>
        )
    }
})
</script>
