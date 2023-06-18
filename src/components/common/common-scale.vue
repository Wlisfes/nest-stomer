<script lang="tsx">
import { defineComponent, computed, type CSSProperties, type PropType } from 'vue'

export default defineComponent({
    name: 'CommonScale',
    props: {
        maxWidth: {
            type: Number,
            default: () => 540
        },
        scale: {
            type: Number,
            default: () => 16 / 9
        },
        align: {
            type: String as PropType<'start' | 'end' | 'center' | 'baseline' | 'stretch'>,
            default: 'center'
        },
        justify: {
            type: String as PropType<'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'>,
            default: 'center'
        },
        style: {
            type: Object as PropType<CSSProperties>,
            default: null
        },
        cursor: {
            type: String as PropType<'default' | 'pointer'>,
            default: 'default'
        },
        flexBox: {
            type: Boolean
        },
        boxStyle: {
            type: Object as PropType<CSSProperties>,
            default: null
        }
    },
    setup(props, { slots }) {
        const { style, align, justify, maxWidth, scale, cursor } = props
        const docker = computed<CSSProperties>(() => ({
            maxWidth: maxWidth + 'px',
            justifyContent: justify,
            alignItems: align,
            cursor,
            ...style
        }))
        const compute = computed<CSSProperties>(() => ({
            paddingBottom: 100 / scale + '%'
        }))

        return () => (
            <div class="common-scale" style={docker.value}>
                <div class="common-scale__compute" style={compute.value}>
                    <div class={{ 'common-scale__column': true, 'flex-box': props.flexBox }} style={props.boxStyle}>
                        {slots.default?.()}
                    </div>
                </div>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-scale {
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    &__compute {
        width: 100%;
        position: relative;
        overflow: hidden;
    }
    &__column {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        &.flex-box {
            display: flex;
            flex-direction: column;
            overflow: hidden;
            :deep(.common-spin),
            :deep(.common-spin) .n-spin-content {
                flex: 1;
                display: flex;
                flex-direction: column;
            }
        }
        :deep(.n-image),
        :deep(.n-image) img,
        :deep(.n-image) .n-skeleton {
            width: 100%;
            height: 100%;
            display: block;
        }
    }
}
</style>
