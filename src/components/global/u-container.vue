<script lang="tsx">
import { defineComponent, computed, PropType, CSSProperties, VNode } from 'vue'
import { divineHandler } from '@/utils/utils-common'
import { useProvider } from '@/hooks/hook-provider'

export default defineComponent({
    name: 'UContainer',
    props: {
        loading: {
            tyep: Boolean,
            default: false
        },
        empty: {
            tyep: Boolean,
            default: false
        },
        style: {
            type: Object as PropType<CSSProperties>,
            default: () => ({})
        },
        space: {
            type: String,
            default: ''
        }
    },
    setup(props, { slots }) {
        const { vars } = useProvider()
        const style = computed(() => {
            props.style.backgroundColor = vars.value.cardColor
            divineHandler(!!props.space, () => (props.style.padding = props.space))
            return props.style
        })
        const RContent = () => {
            if (props.loading && slots.hasOwnProperty('placeholder')) {
                return (slots.placeholder?.() as unknown as VNode) || slots.default?.()
            }

            if (props.empty && slots.hasOwnProperty('empty')) {
                return (slots.empty?.() as unknown as VNode) || slots.default?.()
            }

            return slots.default?.() as unknown as VNode
        }
        return () => (
            <n-el tag="section" class="u-container" style={style.value}>
                <RContent></RContent>
            </n-el>
        )
    }
})
</script>

<style lang="scss" scoped>
.u-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
}
</style>
