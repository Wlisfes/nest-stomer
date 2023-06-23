<script lang="tsx">
import { defineComponent, Fragment, computed, type PropType, type CSSProperties } from 'vue'

export default defineComponent({
    name: 'CommonReactive',
    props: {
        label: { type: [String, Number] },
        labelStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
        labelNone: { type: Boolean, default: false },
        content: { type: [String, Number] },
        contentStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
        contentNone: { type: Boolean, default: false },
        direction: { type: String as PropType<CSSProperties['flex-direction']>, default: 'column' },
        xGap: { type: Number, default: 0 },
        yGap: { type: Number, default: 0 }
    },
    setup(props, { slots }) {
        const styleReact = computed<CSSProperties>(() => ({
            flexDirection: props.direction,
            rowGap: props.yGap + 'px',
            columnGap: props.xGap + 'px'
        }))
        return () => (
            <n-el tag="div" class={{ 'common-reactive': true }} style={styleReact.value}>
                <Fragment>
                    {!props.labelNone && (
                        <div class="common-reactive__label">
                            {slots.label ? (
                                <Fragment>{slots.label(props.label)}</Fragment>
                            ) : props.label ? (
                                <n-ellipsis tooltip={false}>{props.label}</n-ellipsis>
                            ) : (
                                <span style={{ display: 'inline-block' }}>--</span>
                            )}
                        </div>
                    )}
                </Fragment>
                <Fragment>
                    {!props.contentNone && (
                        <div class="common-reactive__content">
                            {slots.default ? (
                                <Fragment>{slots.default(props.content)}</Fragment>
                            ) : props.content ? (
                                <n-ellipsis tooltip={false}>{props.content}</n-ellipsis>
                            ) : (
                                <span style={{ display: 'inline-block' }}>--</span>
                            )}
                        </div>
                    )}
                </Fragment>
            </n-el>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-reactive {
    font-size: var(--font-size);
    line-height: var(--height-tiny);
    display: flex;
    &__label {
        color: var(--text-color-3);
    }
    &__content {
        color: var(--text-color-1);
    }
}
</style>
