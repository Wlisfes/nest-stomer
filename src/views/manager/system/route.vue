<script lang="tsx">
import { defineComponent } from 'vue'
import { httpColumnRoute, type IRoute } from '@/api/http-route'
import { useSource } from '@/hooks/hook-source'

export default defineComponent({
    name: 'Route',
    setup() {
        const { state, fetchUpdate } = useSource<IRoute, Record<string, unknown>>({
            request: httpColumnRoute,
            immediate: true
        })

        return () => (
            <common-container>
                <n-form show-label={false} show-feedback={false} size="large" style={{ padding: '16px' }}>
                    <n-space>
                        <n-form-item>
                            <n-input />
                        </n-form-item>
                        <n-form-item>
                            <n-input />
                        </n-form-item>
                        <n-form-item>
                            <n-input />
                        </n-form-item>
                        <n-button size="large">Create</n-button>
                    </n-space>
                </n-form>
                <common-source
                    came-style={{ padding: '0 16px 64px' }}
                    cols={1}
                    pagination={false}
                    loading={state.loading}
                    page={state.page}
                    size={state.size}
                    total={state.total}
                    data-source={state.dataSource}
                    data-render={(data: IRoute) => <compose-route key={data.id} node={data} onUpdate={fetchUpdate}></compose-route>}
                    onUpdate={fetchUpdate}
                ></common-source>
            </common-container>
        )
    }
})
</script>
