<script lang="tsx">
import { defineComponent, onMounted, toRefs, Fragment } from 'vue'
import { useState } from '@/hooks/hook-state'

export default defineComponent({
    name: 'CommonTouch',
    props: {
        runtime: { type: Boolean },
        disabled: { type: Boolean },
        size: { type: String, default: 'small' }
    },
    emits: ['compute'],
    setup(props, { emit, slots }) {
        const { state, setState } = useState({ loading: false })

        return () => (
            <n-button class="common-touch" type="tertiary">
                Tertiary
            </n-button>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-touch {
}
</style>
