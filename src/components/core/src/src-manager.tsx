import { onMounted, computed } from 'vue'
import { useState } from '@/hooks/hook-state'
import { useProvider } from '@/hooks/hook-provider'
import { useRxicon } from '@/hooks/hook-icon'
import { createComponent } from '@/utils/utils-app'

export function fetchSettin() {
    const { el, mounte, unmount } = createComponent({
        name: 'FetchSettin',
        setup() {
            const { state, setState } = useState({ visible: false })

            onMounted(() => setState({ visible: true }))

            return () => (
                <n-drawer
                    v-model:show={state.visible}
                    to={el}
                    width={280}
                    placement="right"
                    onAfterLeave={unmount}
                ></n-drawer>
            )
        }
    })
}
