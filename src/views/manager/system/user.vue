<script lang="tsx">
import { defineComponent, computed } from 'vue'
import { httpColumnUser, type IUser } from '@/api/http-user'
import { useCurrent } from '@/locale/instance'
import { useSource } from '@/hooks/hook-source'
import { useResize } from '@/hooks/hook-resize'

export default defineComponent({
    name: 'User',
    setup() {
        const { width } = useResize()
        const { t } = useCurrent()
        const { state, fetchUpdate } = useSource<IUser, Record<string, unknown>>({
            request: e => httpColumnUser({ page: e.page, size: e.size }),
            size: 15,
            immediate: true
        })
        const cols = computed(() => {
            if (width.value < 1480) {
                return 1
            } else if (width.value < 2160) {
                return 2
            }
            return 3
        })

        return () => (
            <common-container>
                <common-source
                    loading={state.loading}
                    page={state.page}
                    size={state.size}
                    total={state.total}
                    data-source={state.dataSource}
                    cols={cols.value}
                    data-render={(data: IUser) => <compose-user node={data}></compose-user>}
                ></common-source>
            </common-container>
        )
    }
})
</script>
