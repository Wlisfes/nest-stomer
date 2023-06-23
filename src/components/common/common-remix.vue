<script lang="tsx">
import { defineComponent, computed, createVNode, type PropType, type Component, type CSSProperties } from 'vue'
import { useState } from '@/hooks/hook-state'

export default defineComponent({
    name: 'CommonRemix',
    props: {
        icon: {
            type: Object as PropType<Component>
        },
        spin: {
            type: Object as PropType<Component>
        },
        space: {
            type: Number,
            default: 3
        },
        size: {
            type: Number,
            default: 16
        },
        title: {
            type: String
        }
    },
    emits: ['trigger'],
    setup(props, { slots, emit }) {
        const { state, setState } = useState({ loading: false })
        const remixStyle = computed<CSSProperties>(() => ({
            padding: props.space + 'px',
            '--icon-space': props.size + 'px'
        }))

        const onTrigger = (event: Event) => {
            emit('trigger', {
                event,
                loading: state.loading,
                done: async (value: boolean) => await setState({ loading: value })
            })
        }

        const RemixUI = () => {
            if (state.loading) {
                if (props.spin) {
                    return createVNode(props.spin as Component, { size: props.size })
                }
                return createVNode(<n-icon component={<Icon-RadixSpinWith />}></n-icon>, { size: props.size })
            } else if (slots.default) {
                return slots.default(state, setState)
            } else {
                return createVNode(props.icon as Component, { size: props.size })
            }
        }

        return () => (
            <n-button
                class="common-remix"
                quaternary
                size="small"
                title={props.title}
                disabled={state.loading}
                style={remixStyle.value}
                onClick={onTrigger}
            >
                {{ icon: RemixUI }}
            </n-button>
        )
    }
})
</script>

<style lang="scss" scoped>
.n-button.common-remix {
    position: relative;
    height: initial;
    :deep(.n-button__icon) {
        position: relative;
        height: var(--icon-space);
        width: var(--icon-space);
        max-width: var(--icon-space);
        overflow: hidden;
    }
    :deep(.n-icon-slot) {
        height: var(--icon-space);
        width: var(--icon-space);
    }
}
</style>
