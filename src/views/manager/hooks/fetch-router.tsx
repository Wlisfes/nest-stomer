import { onMounted } from 'vue'
import { useState } from '@/hooks/hook-state'
import { createComponent } from '@/utils/utils-app'
import { Observer } from '@/utils/utils-observer'

export function fetchRouter() {
    const { el, mounte, unmount } = createComponent({
        name: 'FetchRouter',
        setup() {
            const { state, setState } = useState({ visible: false })

            onMounted(() => setState({ visible: true }))

            return () => <n-modal v-model:show={state.visible}></n-modal>
        }
    })

    mounte().catch(e => console.error(e))
}
