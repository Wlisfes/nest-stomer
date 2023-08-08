<script lang="tsx">
import type { PropType, VNodeChild, Component } from 'vue'
import { defineComponent, createVNode } from 'vue'
import { useState } from '@/hooks/hook-state'

export default defineComponent({
    name: 'CommonTouch',
    props: {
        size: { type: String },
        type: { type: String },
        stop: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        loading: { type: Boolean, default: false },
        focusable: { type: Boolean, default: false },
        iconRender: { type: Object as PropType<Component> },
        spinRender: { type: Object as PropType<Component> },
        render: { type: [Object, String, Number] as PropType<VNodeChild> }
    },
    emits: ['click'],
    setup(props, { emit }) {
        const { state, setState } = useState({ loading: props.loading })

        const IconRender = () => {
            if (state.loading) {
                if (props.spinRender) {
                    return createVNode(props.spinRender, { size: props.size })
                }
                return createVNode(<n-icon component={<Icon-RadixSpinWith />}></n-icon>)
            }
            return props.iconRender ? createVNode(props.iconRender) : undefined
        }

        return () => (
            <n-button
                class="common-touch"
                disabled={state.loading}
                size={props.size}
                type={props.type}
                onClick={(e: Event) => emit('click', state, setState)}
            >
                {{ icon: IconRender, default: () => props.render }}
            </n-button>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-touch {
    position: relative;
}
</style>
