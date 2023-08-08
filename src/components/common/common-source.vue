<script lang="tsx">
import type { PropType, CSSProperties, VNodeChild } from 'vue'
import type { ScrollbarInst } from 'naive-ui'
import { defineComponent, computed, Fragment, ref, watch } from 'vue'
import { useElementSize } from '@vueuse/core'
import { divineCols } from '@/utils/utils-common'

export default defineComponent({
    name: 'CommonSource',
    props: {
        loading: { type: Boolean, default: true },
        page: { type: Number, default: 1 },
        size: { type: Number, default: 10 },
        pageSizes: { type: Array, default: () => [10, 20, 30, 40, 50] },
        total: { type: Number, default: 0 },
        dataSource: { type: Array as PropType<Array<Record<string, unknown>>>, default: () => [] },
        dataRender: { type: Function as PropType<(e: Record<string, unknown>, c: unknown) => VNodeChild> },
        cameStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
        cols: { type: Object as PropType<Record<number, number>>, default: () => ({}) },
        defaultCols: { type: Number, default: 24 },
        xGap: { type: Number, default: 16 },
        yGap: { type: Number, default: 16 },
        pagination: { type: Boolean, default: true }
    },
    emits: ['update', 'resize'],
    setup(props, { emit }) {
        const scrollbar = ref<ScrollbarInst>()
        const element = ref<HTMLElement>()
        const { width, height } = useElementSize(element)

        const cols = computed(() => {
            return divineCols(props.cols, width.value, props.defaultCols)
        })
        const cameStyle = computed<CSSProperties>(() => ({
            ...props.cameStyle,
            rowGap: props.xGap + 'px',
            columnGap: props.yGap + 'px',
            gridTemplateColumns: `repeat(${cols.value}, minmax(0px, 1fr))`
        }))

        watch(
            () => [width.value, height.value],
            () => {
                emit('resize', { width: width.value, height: height.value, cols: cols.value })
            },
            { immediate: true }
        )

        function onUpdate(option: { page?: number; size?: number }) {
            scrollbar.value?.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            emit('update', option)
        }

        return () => (
            <section ref={element} class={{ 'common-source': true }}>
                {props.loading && props.total === 0 ? (
                    <n-spin stroke-width={12} size={60} style={{ minHeight: '240px' }}></n-spin>
                ) : !props.loading && props.total === 0 ? (
                    <n-empty style={{ minHeight: '240px', justifyContent: 'center' }}>
                        {{
                            default: () => (
                                <n-text depth="3" style={{ fontSize: '20px' }}>
                                    暂无内容
                                </n-text>
                            )
                        }}
                    </n-empty>
                ) : (
                    <n-spin class="common-source__spin" stroke-width={12} size={60} show={props.loading}>
                        <n-scrollbar ref={scrollbar} x-scrollable>
                            <Fragment>
                                <div class="common-source__container" style={cameStyle.value}>
                                    {props.dataSource.map(item => {
                                        return (
                                            props.dataRender?.(item, { width: width.value, height: height.value, cols: cols.value }) ?? null
                                        )
                                    })}
                                </div>
                                {props.pagination && (
                                    <div class="common-source__pagination">
                                        <n-pagination
                                            size="large"
                                            page={props.page}
                                            page-size={props.size}
                                            item-count={props.total}
                                            page-sizes={props.pageSizes}
                                            show-size-picker
                                            display-order={['pages', 'size-picker']}
                                            on-update:page={(page: number) => onUpdate({ page })}
                                            on-update:page-size={(size: number) => onUpdate({ size, page: 1 })}
                                        />
                                    </div>
                                )}
                            </Fragment>
                        </n-scrollbar>
                    </n-spin>
                )}
            </section>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-source {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    &__spin {
        position: relative;
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        :deep(.n-spin-content) {
            position: relative;
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
    }
    &__container {
        position: relative;
        display: grid;
        padding: 16px 16px 48px;
        background-color: var(--back-color);
    }
    &__pagination {
        display: flex;
        justify-content: center;
        padding: 0 16px 64px;
    }
}
</style>
